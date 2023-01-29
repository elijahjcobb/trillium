import { Footer } from "#/components/footer";
import { Callout } from "#/components/home/callout";
import { Nav } from "#/components/nav";
import { Property } from "#/components/property";
import { BATHS, BEDS, CITIES, ONE_DAY, PRICE_BRACKETS, PROPERTY_TYPES, SQFT, YEAR_BUILT } from "#/data/constants";
import { Property as PropertyType } from "#/data/types";
import { topProperties } from "#/helpers/search";
import { GetStaticProps } from "next";
import { useState } from "react";
import styles from "#/styles/search.module.css";
import { Select } from "#/components/query-picker";
import { Button } from "#/components/button";
import { FaSearch } from "react-icons/fa";


interface Props {
	properties: PropertyType[];
}

export default function Page(props: Props) {

	const [properties, setProperties] = useState<PropertyType[]>(props.properties);
	const [city, setCity] = useState(0);
	const [type, setType] = useState(0);
	const [priceBracket, setPriceBracket] = useState(0);
	const [beds, setBeds] = useState(0);
	const [baths, setBaths] = useState(0);
	const [sqft, setSqft] = useState(0);
	const [year, setYear] = useState(0);

	return <>
		<Nav />
		<div className={styles.queryBar}>
			<Select label="Location" value={city} onSelect={setCity} options={CITIES} />
			<Select label="Type" value={type} onSelect={setType} options={PROPERTY_TYPES} />
			<Select label="Price" value={priceBracket} onSelect={setPriceBracket} options={PRICE_BRACKETS} />
			<Select label="Beds" value={beds} onSelect={setBeds} options={BEDS} />
			<Select label="Baths" value={baths} onSelect={setBaths} options={BATHS} />
			<Select label="Sqft" value={sqft} onSelect={setSqft} options={SQFT} />
			<Select label="Year Built" value={year} onSelect={setYear} options={YEAR_BUILT} />
			<div className={styles.spacer} />
			<Button value="Update" icon={FaSearch} />
		</div>
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