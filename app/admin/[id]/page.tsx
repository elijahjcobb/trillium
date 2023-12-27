/* eslint-disable react/display-name */
import { prisma } from "#/lib/prisma";
import { Event, Heartbeat } from "@prisma/client";
import { z } from "zod";

import { type HeartbeatWithWatchTime, UserView } from "./user-view";
import { verifyUser } from "#/lib/verify-user";

function isHeartbeat(event: unknown): event is Heartbeat {
	return typeof event === "object" && event !== null && "href" in event && typeof event.href === "string";
}

export const dynamic = 'force-dynamic';

const pageCountSchema = z.array(z.object({
	count: z.bigint().transform((val) => Number(val)),
	href: z.string()
}));

type PageCount = z.infer<typeof pageCountSchema>;

async function getPageCounts(userId: string): Promise<{ properties: PageCount, pages: PageCount }> {
	const result = await prisma.$queryRaw`SELECT COUNT(*), href FROM "Heartbeat" WHERE "userId"=${userId} GROUP BY "href"`;
	const counts = pageCountSchema.parse(result);
	return {
		pages: counts.filter((count) => !count.href.startsWith("/search/")).sort((a, b) => b.count - a.count),
		properties: counts.filter((count) => count.href.startsWith("/search/")).sort((a, b) => b.count - a.count),
	}
}


export default async function Page(page: { params: { id: string } }): Promise<JSX.Element> {
	const { isAdmin } = await verifyUser();
	if (!isAdmin) throw new Error("No.");


	const userId = page.params.id;
	const targetUser = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
	const { pages, properties } = await getPageCounts(userId);
	const favorites = await prisma.favorite.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
	const events = await prisma.event.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
	const heartbeats = await prisma.heartbeat.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
	const allEvents = [...events, ...heartbeats].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	const aggregatedEvents: (Event | HeartbeatWithWatchTime)[] = [];

	for (const event of allEvents) {
		if (isHeartbeat(event)) {
			const lastEvent = aggregatedEvents[aggregatedEvents.length - 1];
			if (isHeartbeat(lastEvent) && lastEvent.href === event.href) {
				const lastEventTime = lastEvent.createdAt.getTime();
				const eventTime = event.createdAt.getTime();
				const watchTime = (lastEventTime - eventTime) / 1000;
				aggregatedEvents.pop();
				aggregatedEvents.push({
					...event,
					watchTime
				});
			} else {
				aggregatedEvents.push(event);
			}
		} else {
			aggregatedEvents.push(event);
		}
	}


	return <UserView user={targetUser} events={aggregatedEvents} favorites={favorites} pages={pages} properties={properties} />
}