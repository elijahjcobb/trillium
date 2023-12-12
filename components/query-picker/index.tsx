"use client";
import { Button } from "../button";
import { FaSearch } from 'react-icons/fa';
import styles from "./index.module.css";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { CITIES, PRICE_BRACKETS, PROPERTY_TYPES } from "#/data/constants";
import { useRouter } from "next/navigation";
import { type TrackFunction, useAnalytics } from "#/helpers/use-analytics";

export function Select({
	value,
	label,
	options,
	onSelect,
	name,
	trackFunc
}: {
	value?: number;
	label: string;
	onSelect?: (value: number) => void;
	options: string[];
	name?: string;
	trackFunc?: TrackFunction;
}): JSX.Element {

	const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		const index = Number(event.target.value);
		if (onSelect) onSelect(index);
		if (trackFunc) trackFunc(label.toLowerCase(), options[index]);
	}, [label, onSelect, options, trackFunc]);

	const optionsMemoized = useMemo(() => {
		return options.map((option, i) => <option value={i} key={option}>{option}</option>)
	}, [options]);

	return <div className={styles.item}>
		<div className={styles.itemTop}>
			<span className={styles.label}>{label}</span>
		</div>
		<select name={name} value={value} onChange={handleChange}>
			{optionsMemoized}
		</select>
	</div>
}

export function QueryPicker(): JSX.Element {

	const [city, setCity] = useState(0);
	const [type, setType] = useState(0);
	const [priceBracket, setPriceBracket] = useState(0);
	const router = useRouter();

	const track = useAnalytics("query-picker-mini");

	const search = useCallback(() => {
		track("search");
		const params = new URLSearchParams();
		params.set('city', `${city}`);
		params.set('type', `${type}`);
		params.set('price', `${priceBracket}`);
		const url = `/search?${params.toString()}`;
		router.push(url)
	}, [track, city, type, priceBracket, router]);

	return <div className={styles.container}>
		<Select trackFunc={track} label="Location" value={city} onSelect={setCity} options={CITIES} />
		<Select trackFunc={track} label="Type" value={type} onSelect={setType} options={PROPERTY_TYPES} />
		<Select trackFunc={track} label="Price" value={priceBracket} onSelect={setPriceBracket} options={PRICE_BRACKETS} />
		<Button value="Search" onClick={search} icon={FaSearch} />
	</div>
}