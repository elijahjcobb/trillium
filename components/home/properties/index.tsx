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
				mls={p.mls}
				key={p.mls}
				name='Modern Apartment in City'
				address={p.address}
				price={p.listPrice}
				beds={p.bedrooms}
				bathrooms={p.baths}
				sqft={p.sqft}
				image={p.images[0]}
			/>)}
		</div>
		<Button href='/properties' value='View More Properties' postIcon={FaArrowRight} />
	</section>
}