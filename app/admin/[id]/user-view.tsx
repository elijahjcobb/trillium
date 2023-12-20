"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { FaEye, FaMinus, FaPlus, FaStar, FaUser } from "react-icons/fa";
import styles from "./index.module.css";
import { truncate } from "lodash";
import { Button } from "#/components/button";
import { Event, Favorite, Heartbeat, User } from "@prisma/client";
import { useCallback, useState } from "react";

function Row({ message, type, icon: Icon, secondaryIcon: SecondaryIcon, href, label, date }: { date: Date; message: string, type: string, icon: IconType; secondaryIcon?: IconType; href?: string; label?: string }): JSX.Element {
	return <tr className={styles.eventRow}>
		<td>{date.toLocaleString()}</td>
		<td>
			<div className={styles.icons}>
				<Icon className={styles.primaryIcon} size={24} />
				{SecondaryIcon && <SecondaryIcon className={styles.secondaryIcon} size={8} />}
				{type}
			</div>
		</td>
		<td>{message}</td>
		<td>{href && <Link target="_blank" href={href}>{truncate(label ?? href, { length: 24 })}</Link>}</td>
	</tr>
}

function isHeartbeat(event: unknown): event is Heartbeat {
	return typeof event === "object" && event !== null && "href" in event && typeof event.href === "string";
}

export type HeartbeatWithWatchTime = Heartbeat & { watchTime?: number };

export interface UserViewProps {
	pages: { count: number; href: string; }[];
	properties: { count: number; href: string; }[];
	favorites: Favorite[];
	events: (Event | HeartbeatWithWatchTime)[];
	user: User;
}

export function UserView({ pages, properties, favorites, events: initialEvents, user }: UserViewProps): JSX.Element {

	const [events, setEvents] = useState<(Event | HeartbeatWithWatchTime)[]>(initialEvents);
	const [showHeartbeats, setShowHeartbeats] = useState(true);

	const onClick = useCallback(() => {
		let shouldShow = !showHeartbeats;
		setShowHeartbeats(shouldShow);

		if (shouldShow) {
			setEvents(initialEvents);
		} else {
			setEvents(initialEvents.filter((event) => !isHeartbeat(event)));
		}

	}, [initialEvents, showHeartbeats]);

	return <div className={styles.page}>
		<section>
			<h2>User</h2>
			<p>{`This is the user's email address.`}</p>
			<p className={styles.email}><Link href={`mailto:${user.email}`}>{user.email}</Link></p>
		</section>
		<section>
			<h2>Page Heartbeats</h2>
			<p>{`Every second a user is on a page, it will record one heartbeat.`}</p>
			<table>
				<thead>
					<tr>
						<th>Page</th>
						<th>Heartbeats (View Time)</th>
					</tr>
				</thead>
				<tbody>
					{pages.map((p) => <tr key={p.href}>
						<td><Link target="_blank" href={p.href}>{p.href}</Link></td>
						<td>{p.count.toLocaleString()} sec</td>
					</tr>)}
				</tbody>
			</table>
		</section>
		<section>
			<h2>Favorite Properties</h2>
			<p>{`These are the current properties the user has in their favorite properties list.`}</p>
			<table>
				<thead>
					<tr>
						<th>Property (MLS)</th>
						<th>Date Favorited</th>
					</tr>
				</thead>
				<tbody>
					{favorites.map((p) => <tr key={p.mls}>
						<td><Link target="_blank" href={`/search/${p.mls}`}>{p.mls}</Link></td>
						<td>{p.createdAt.toLocaleDateString()}</td>
					</tr>)}
				</tbody>
			</table>
		</section>
		<section>
			<h2>Property Heartbeats</h2>
			<p>{`Every second a user is looking at a property, it will record one heartbeat.`}</p>
			<table>
				<thead>
					<tr>
						<th>Property (MLS)</th>
						<th>Heartbeats (View Time)</th>
					</tr>
				</thead>
				<tbody>
					{properties.map((p) => <tr key={p.href}>
						<td><Link target="_blank" href={p.href}>{p.href.replace("/search/", "")}</Link></td>
						<td>{p.count.toLocaleString()} sec</td>
					</tr>)}
				</tbody>
			</table>
		</section>
		<section>
			<div className={styles.eventHeader}>
				<h2>Events</h2>
				<Button onClick={onClick} value={`${showHeartbeats ? "Hide" : "Show"} Page Views`} />
			</div>
			<p>{`All events that have been recorded for the user.`}</p>
			<table className={styles.eventTable}>
				<thead>
					<tr>
						<th>Timestamp</th>
						<th>Type</th>
						<th>Description</th>
						<th>Metadata</th>
					</tr>
				</thead>
				<tbody>
					{events.map((event): JSX.Element | null => {
						if (isHeartbeat(event)) {
							return <Row date={event.createdAt} type={'heartbeat'} key={event.id} message={event.watchTime ? `Viewed page for ${event.watchTime.toPrecision(2)} seconds.` : "Viewed page."} href={event.href} icon={FaEye} />;
						} else {
							// @ts-expect-error - mls is not in the type
							const mls = event.meta?.mls as string;
							switch (event.key) {
								case "favorites.read":
									return <Row date={event.createdAt} type={event.key} message="Looked at their favorite properties list." icon={FaStar} />;
								case "favorites.add":
									return <Row date={event.createdAt} type={event.key} message="Added a properties to their favorites list." icon={FaStar} secondaryIcon={FaPlus} href={`/search/${mls}`} label={mls} />;
								case "favorites.remove":
									return <Row date={event.createdAt} type={event.key} message="Removed a properties to their favorites list." icon={FaStar} secondaryIcon={FaMinus} href={`/search/${mls}`} label={mls} />;
								case "user.login":
									return <Row date={event.createdAt} type={event.key} message="Logged into their account." icon={FaUser} />;
								default:
									return null;
							}
						}
					})}
				</tbody>
			</table>
		</section>
	</div>
}