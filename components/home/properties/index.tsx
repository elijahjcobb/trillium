"use client";
import { Button } from "#/components/button";
import { Property } from "#/components/property";
import { FaArrowRight } from "react-icons/fa";
import styles from "./index.module.css";
import homeImage from "#/public/home.png";
import { Property as PropertyType } from "#/data/types";

export function Properties({ properties }: { properties: PropertyType[] }): JSX.Element {
	return <section className={styles.container}>
		<h2>Top Properties</h2>
		<p className={styles.subtitle}>Iste excepturi eaque consequatur laborum sit architecto voluptatem asperiores.</p>
		<div className={styles.properties}>
			{properties.map(p => <Property
				key={p.mls}
				property={p}
			/>)}
		</div>
		<Button href='/search' value='View More Properties' postIcon={FaArrowRight} />
	</section>
}