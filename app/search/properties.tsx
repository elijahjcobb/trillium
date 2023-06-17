"use client";

import { Button } from "#/components/button";
import { Property } from "#/components/property";
import { Select } from "#/components/query-picker";
import { CITIES, PROPERTY_TYPES, PRICE_BRACKETS, BEDS, BATHS, SQFT, YEAR_BUILT } from "#/data/constants";
import { Property as PropertyType } from "#/data/types";
import { FaSearch } from "react-icons/fa";
import styles from "#/styles/search.module.css";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { fetchPropertiesForQuery } from "./actions";
import { Skeleton } from "#/components/skeleton";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";

export function Properties(props: { properties: PropertyType[] }): JSX.Element {

	const [properties, setProperties] = useState<PropertyType[]>(props.properties);
	const searchParams = useSearchParams();

	const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setProperties([]);
		const formData = new FormData(event.currentTarget);
		track("search", Object.fromEntries(formData.entries()) as Record<string, string>);
		fetchPropertiesForQuery(formData).then(setProperties);
	}, []);

	const [city, setCity] = useState(0);
	const [type, setType] = useState(0);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		if (searchParams.get("city")) setCity(Number(searchParams.get("city")));
		if (searchParams.get("type")) setType(Number(searchParams.get("type")));
		if (searchParams.get("price")) setPrice(Number(searchParams.get("price")));
	}, [searchParams]);

	return <>
		<form onSubmit={handleSubmit} className={styles.queryBar}>
			<Select value={city} onSelect={setCity} name='city' label="Location" options={CITIES} />
			<Select value={type} onSelect={setType} name='type' label="Type" options={PROPERTY_TYPES} />
			<Select value={price} onSelect={setPrice} name='price' label="Price" options={PRICE_BRACKETS} />
			<Select name='beds' label="Beds" options={BEDS} />
			<Select name='baths' label="Baths" options={BATHS} />
			<Select name='sqft' label="Sqft" options={SQFT} />
			<Select name='year' label="Year Built" options={YEAR_BUILT} />
			<div className={styles.spacer} />
			<Button type="submit" value="Update" icon={<FaSearch />} />
		</form>
		<div className={styles.properties}>
			{properties.length === 0 ? <>
				<PropertySkeleton />
				<PropertySkeleton />
				<PropertySkeleton />
				<PropertySkeleton />
				<PropertySkeleton />
				<PropertySkeleton />
			</> : null}
			{properties.map(p => <Property key={p.mls} property={p} />)}
		</div>
	</>
}

const PropertySkeleton = () => <Skeleton width={370} height={412.5} />