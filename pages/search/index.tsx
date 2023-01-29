import { Footer } from "#/components/footer";
import { Callout } from "#/components/home/callout";
import { Nav } from "#/components/nav";
import { Property } from "#/components/property";
import { ONE_DAY } from "#/data/constants";
import { Property as PropertyType } from "#/data/types";
import { topProperties } from "#/helpers/search";
import { GetStaticProps } from "next";
import { useState } from "react";
import styles from "#/styles/search.module.css";


interface Props {
	properties: PropertyType[];
}

export default function Page(props: Props) {

	const [properties, setProperties] = useState<PropertyType[]>(props.properties);

	return <>
		<Nav />
		<div className={styles.properties}>
			{properties.map(p => <Property key={p.mls} property={p} />)}
		</div>
		<Callout
			subtitle="If you have found something you like, let us know, we can start the process today."
			cta="Start the buying process"
			title="Find something you like?" />
		<Footer />
	</>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	return {
		props: {
			properties: await topProperties(30)
		},
		revalidate: ONE_DAY,
	}
}