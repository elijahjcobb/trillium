/* eslint-disable react/display-name */
import { prisma } from "#/lib/prisma";
import { Event, Heartbeat } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaEye, FaMinus, FaPlus, FaStar, FaUser } from "react-icons/fa";
import { z } from "zod";
import styles from "./index.module.css";

export const dynamic = 'force-dynamic';


function Row({ message, icon: Icon, secondaryIcon: SecondaryIcon, href, label }: { message: string, icon: IconType; secondaryIcon?: IconType; href?: string; label?: string }): JSX.Element {
	return <li className={styles.eventRow}>
		<div className={styles.icons}>
			<Icon className={styles.primaryIcon} size={24} />
			{SecondaryIcon && <SecondaryIcon className={styles.secondaryIcon} size={8} />}
		</div>
		{message}
		{href && <Link target="_blank" href={href}>{label ?? href}</Link>}
	</li>
}

const pageCountSchema = z.array(z.object({
	count: z.bigint().transform((val) => val.toString()),
	href: z.string()
}));

type PageCount = z.infer<typeof pageCountSchema>;

async function getPageCounts(userId: string): Promise<{ properties: PageCount, pages: PageCount }> {
	const result = await prisma.$queryRaw`SELECT COUNT(*), href FROM "Heartbeat" WHERE "userId"=${userId} GROUP BY "href"`;
	const counts = pageCountSchema.parse(result);
	return {
		pages: counts.filter((count) => !count.href.startsWith("/search/")),
		properties: counts.filter((count) => count.href.startsWith("/search/"))
	}
}

function isHeartbeat(event: unknown): event is Heartbeat {
	return typeof event === "object" && event !== null && "href" in event && typeof event.href === "string";
}

type HeartbeatWithWatchTime = Heartbeat & { watchTime?: number };

export default async function Page(page: { params: { id: string } }): Promise<JSX.Element> {
	const userId = page.params.id;
	const user = await prisma.user.findUnique({ where: { id: userId } });
	const { pages, properties } = await getPageCounts(userId);
	const favorites = await prisma.favorite.findMany({ where: { userId } });
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

	return <div>
		<h1>User</h1>
		<p>{user?.email}</p>
		<h2>Page Views</h2>
		<ul>
			{pages.map((p) => <li key={p.href}><Link target="_blank" href={p.href}>{p.href}</Link> - {p.count} views</li>)}
		</ul>
		<h2>Favorites Properties</h2>
		<ul>
			{favorites.map((favorite) => <li key={favorite.mls}><Link target="_blank" href={`/search/${favorite.mls}`}>{favorite.mls}</Link> - {favorite.createdAt.toLocaleDateString()}</li>)}
		</ul>
		<h2>Property Views</h2>
		<ul>
			{properties.map((p) => <li key={p.href}><Link target="_blank" href={p.href}>{p.href.replace("/search/", "")}</Link> - {p.count} views</li>)}
		</ul>
		<h2>Events</h2>
		<ul>
			{aggregatedEvents.map((event): JSX.Element => {
				if (isHeartbeat(event)) {
					return <Row key={event.id} message={event.watchTime ? `Viewed page for ${event.watchTime.toPrecision(2)} seconds.` : "Viewed page."} href={event.href} icon={FaEye} />;
				} else {
					switch (event.key) {
						case "favorites.read":
							return <Row message="Looked at their favorite properties list." icon={FaStar} />;
						case "favorites.add":
							return <Row message="Added a properties to their favorites list." icon={FaStar} secondaryIcon={FaPlus} href={`/search/${event.meta?.mls}`} label={event.meta?.mls} />;
						case "favorites.remove":
							return <Row message="Removed a properties to their favorites list." icon={FaStar} secondaryIcon={FaMinus} href={`/search/${event.meta?.mls}`} label={event.meta?.mls} />;
						case "user.login":
							return <Row message="Logged into their account." icon={FaUser} />;
						default:
							return <li key={event.key}>{event.key}</li>
					}
				}
			})}
		</ul>
	</div >
}