import { CronEmailTemplate } from "#/components/email/cron";
import { resend, EMAIL_ADDRESSES } from "#/lib/email";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function fetcher<T>(path: string, params: URLSearchParams): Promise<T> {
  params.set("projectId", process.env.VERCEL_PROJECT_ID!);
  params.set("teamId", process.env.VERCEL_TEAM_ID!);
  params.set("limit", "250");
  params.set(
    "environment",
    process.env.VERCEL_ENV === "production" ? "production" : "preview"
  );

  params.set(
    "from",
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toISOString()
  );
  params.set("to", new Date().toISOString());

  const res = await fetch(
    `https://vercel.com/api/web/insights/stats${path}?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN!}`,
      },
    }
  );
  return await res.json();
}

type PageViews = Record<string, number>;

async function fetchPageViews(): Promise<PageViews> {
  const params = new URLSearchParams();
  const res = await fetcher<{
    data: { key: string; total: number; devices: number }[];
  }>("/path", params);
  return Object.fromEntries(res.data.map((d) => [d.key, d.total]));
}

type Events = Record<string, number>;

async function fetchEvents(): Promise<Events> {
  const params = new URLSearchParams();
  const res = await fetcher<{
    data: { key: string; total: number; devices: number }[];
  }>("/event_name", params);
  return Object.fromEntries(res.data.map((d) => [d.key, d.total]));
}

async function fetchEvent(eventName: string): Promise<Events> {
  const params = new URLSearchParams();
  params.set(
    "filter",
    `{"event_name":{"values":["${eventName}"],"operator":"eq"}}`
  );
  params.set("jsonProperty", "key");
  const res = await fetcher<{
    data: { key: string; total: number; devices: number }[];
  }>("/event_data", params);
  return Object.fromEntries(res.data.map((d) => [d.key, d.total]));
}

type EventsWithData = Record<
  string,
  {
    total: number;
    keys: Record<string, number>;
  }
>;

async function fetchEventsWithSubdata(): Promise<EventsWithData> {
  const events = await fetchEvents();

  const result: EventsWithData = {};

  for (const [key, value] of Object.entries(events)) {
    result[key] = {
      total: value,
      keys: await fetchEvent(key),
    };
  }
  return result;
}

export interface CronData {
  pageViews: PageViews;
  events: EventsWithData;
}

async function getCronData(): Promise<CronData> {
  const pageViews = await fetchPageViews();
  const events = await fetchEventsWithSubdata();
  return {
    pageViews,
    events,
  };
}

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.VERCEL_ENV !== "development" &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  const cronData = await getCronData();
  await resend.emails.send({
    from: "Trillium Partners Notifications <no-reply@trillium.elijahcobb.app>",
    to: EMAIL_ADDRESSES,
    subject: "Website Analytics",
    react: CronEmailTemplate(cronData),
  });
  return NextResponse.json({});
};
