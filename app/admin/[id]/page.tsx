import { prisma } from "#/lib/prisma";
import { Event } from "@prisma/client";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export function Heartbeat({ }: { event: Event }): JSX.Element {
	return <div>
		hi
	</div>
}

function eventComponent(type: string): ((props: { event: Event }) => JSX.Element) | null {
	switch (type) {
		case "heartbeat": return Heartbeat;
		default: return null;
	}
}

export default async function Page(page: { params: { id: string } }): Promise<JSX.Element> {
	const userId = page.params.id;
	const user = await prisma.user.findUnique({ where: { id: userId } });
	const favorites = await prisma.favorite.findMany({ where: { userId } });
	const events = await prisma.event.findMany({ where: { userId } });
	return <div>
		<h1>User</h1>
		<p>{user?.email}</p>
		<h2>Favorites</h2>
		<ul>
			{favorites.map((favorite) => <li key={favorite.mls}><Link target="_blank" href={`/search/${favorite.mls}`}>{favorite.mls}</Link></li>)}
		</ul>
		<h2>Events</h2>
		<ul>
			{events.map((event) => {
				const Comp = eventComponent(event.key);
				return <li key={event.id}>{Comp ? <Comp event={event} /> : event.type}</li>
			})}
		</ul>
	</div>
}