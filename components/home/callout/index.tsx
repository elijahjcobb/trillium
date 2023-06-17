"use client";

import { Button } from "#/components/button";
import { useCallback } from "react";
import styles from "./index.module.css";
import va from "@vercel/analytics";

export function Callout({
	title = 'Talk to an Agent',
	subtitle = 'Quod eligendi suscipit doloremque sunt id. Accusantium explicabo minima modi ut.',
	cta = 'Connect with an Agent',
	href = '/contact',
	location
}: {
	title?: string;
	subtitle?: string,
	cta?: string;
	href?: string;
	location: string
}) {

	const track = useCallback(() => {
		va.track("callout-clicked", { location })
	}, [location]);

	return <section className={styles.container}>
		<div className={styles.inner}>
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.subtitle}>{subtitle}</p>
			</div>
			<Button onClick={track} href={href} value={cta} />
		</div>
	</section>
}