import { CronData } from '#/app/api/cron/route';
import * as React from 'react';


export const CronEmailTemplate: React.FC<Readonly<CronData>> = ({
	events,
	pageViews
}) => (
	<div>
		<h1>Trillium Partners Analytics</h1>
		<p>Below is a breakdown of the traffic and usage on your site. The data is aggregated over <strong>the last week</strong>.</p>
		<section>
			<h2>Page Views</h2>
			<table>
				<tbody>
					<tr>
						<td><strong>Total</strong></td>
						<td>{Object.values(pageViews).reduce((total, current) => total + current, 0)}</td>
					</tr>
					{Object.entries(pageViews).map(([page, views]) => (
						<tr key={page}>
							<td><a target="_blank" href={`https://trillium-partners.vercel.app${page}`} rel="noreferrer">{page}</a></td>
							<td>{views}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
		<section>
			<h2>Events</h2>
			{Object.entries(events).map(([event, { keys, total }]) => {
				return <div key={event}>
					<h3>{event}</h3>
					<table >
						<tbody>
							<tr>
								<td><strong>Total</strong></td>
								<td>{total}</td>
							</tr>
							{Object.entries(keys).map(([key, views]) => (
								<tr key={key}>
									<td>{key}</td>
									<td>{views}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			})}
		</section>
		<p>This was an automated email.</p>
	</div>
);
