import { NextResponse } from "next/server";

// paths
// https://vercel.com/api/web/insights/stats/path?environment=preview&filter={}&from=2023-12-06T00:00:00.000Z&limit=250&projectId=trillium-partners&teamId=team_vnv82uVvLJJyvnsiNdcx3zd8&to=2023-12-13T00:00:00.000Z

// events
// https://vercel.com/api/web/insights/stats/event_name?environment=preview&filter={}&from=2023-12-06T00:00:00.000Z&limit=250&projectId=trillium-partners&teamId=team_vnv82uVvLJJyvnsiNdcx3zd8&to=2023-12-13T00:00:00.000Z

// specific event
// https://vercel.com/api/web/insights/stats/event_data?environment=preview&filter={"event_name":{"values":["callout"],"operator":"eq"}}&from=2023-12-06T00:00:00.000Z&jsonProperty=key&limit=250&projectId=trillium-partners&teamId=team_vnv82uVvLJJyvnsiNdcx3zd8&to=2023-12-13T00:00:00.000Z

// x
// https://vercel.com/api/web/insights/stats/event_data?environment=preview&filter={"event_name":{"values":["callout"],"operator":"eq"}}&from=2023-12-06T00:00:00.000Z&jsonProperty=key&limit=250&projectId=trillium-partners&teamId=team_vnv82uVvLJJyvnsiNdcx3zd8&to=2023-12-13T00:00:00.000Z
// https://vercel.com/api/web/insights/stats/event_data?filter={"event_name":{"values":["callout"],"operator":"eq"}}&projectId=trillium-partners&teamId=team_vnv82uVvLJJyvnsiNdcx3zd8&limit=250&environment=preview&from=2023-12-06T00:00:00.000Z&to=2023-12-13T00:00:00.000Z

async function fetcher<T>(path: string, params: URLSearchParams): Promise<T> {
  params.set("projectId", process.env.VERCEL_PROJECT_ID!);
  params.set("teamId", process.env.VERCEL_TEAM_ID!);
  params.set("limit", "250");
  params.set(
    "environment",
    process.env.VERCEL_ENV === "production" ? "production" : "preview"
  );
  params.set("from", "2023-12-06T00:00:00.000Z");
  params.set("to", "2023-12-13T00:00:00.000Z");

  const url = `https://vercel.com/api/web/insights/stats${path}?${params.toString()}`;
  console.log({ url });
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN!}`,
    },
  });
  const x = await res.json();
  console.log(x);
  return x;
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

export const GET = async (): Promise<NextResponse> => {
  const pageViews = await fetchPageViews();
  const events = await fetchEventsWithSubdata();
  const d = {
    pageViews,
    events,
  };
  console.log(JSON.stringify(d, null, 2));
  return NextResponse.json({});
};
