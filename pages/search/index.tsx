import { Footer } from "#/components/footer";
import { Callout } from "#/components/home/callout";
import { Nav } from "#/components/nav";
import { Property } from "#/components/property";
import { BATHS, BEDS, CITIES, ONE_DAY, PRICE_BRACKETS, PROPERTY_TYPES, SQFT, YEAR_BUILT } from "#/data/constants";
import { Property as PropertyType } from "#/data/types";
import { topProperties } from "#/helpers/search";
import { GetStaticProps } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "#/styles/search.module.css";
import { Select } from "#/components/query-picker";
import { Button } from "#/components/button";
import { FaSearch } from "react-icons/fa";
import { convertBracketsToQuery } from "#/helpers/convert";
import { fetcher } from "#/helpers/fetcher";

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
	const [loading, setLoading] = useState(false);
	const hasInitialUpdate = useRef(false);

	const update = useCallback((initial?: { city: number, price: number, type: number }) => {
		console.log("START UPDATE");
		setLoading(true);
		console.log({ city })
		const query = convertBracketsToQuery({
			city: initial?.city ?? city,
			type: initial?.type ?? type,
			price: initial?.price ?? priceBracket,
			beds, baths, sqft, yearBuilt: year
		});
		console.log({ query });
		fetcher<PropertyType[]>({
			path: '/search',
			method: "POST",
			body: query
		}).then((p) => {
			console.log("SUCCESS");
			setProperties(p);
		}).catch(console.error).finally(() => {
			setLoading(false);
			console.log("DONE UPDATE");
		})
	}, [city, type, priceBracket, beds, baths, sqft, year]);

	useEffect(() => {

		if (hasInitialUpdate.current) return;

		const url = window.location.search;
		if (!url) return;
		const params = new URLSearchParams(url);

		let doUpdate = false;
		let initial = { city: 0, price: 0, type: 0 };

		if (params.has('city')) {
			const c = parseInt(params.get('city')!);
			if (!Number.isNaN(c) && c !== 0) {
				setCity(c);
				initial.city = c;
				doUpdate = true;
			}

		}
		if (params.has('price')) {
			const c = parseInt(params.get('price')!);
			if (!Number.isNaN(c) && c !== 0) {
				setPriceBracket(c);
				initial.price = c;
				doUpdate = true;
			}
		}
		if (params.has('type')) {
			const c = parseInt(params.get('type')!);
			if (!Number.isNaN(c) && c !== 0) {
				setType(c);
				initial.type = c;
				doUpdate = true;
			}
		}

		if (doUpdate && !hasInitialUpdate.current) {
			update(initial);
			hasInitialUpdate.current = true;
		}
	}, [update]);

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
			<Button disabled={loading} onClick={update} value="Update" icon={FaSearch} />
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
