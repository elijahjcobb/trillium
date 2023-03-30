import { Button } from "../button";
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import styles from "./index.module.css";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { CITIES, PRICE_BRACKETS, PROPERTY_TYPES } from "#/data/constants";
import { convertBracketsToQuery } from "#/helpers/convert";
import { stringify } from "querystring";
import { useRouter } from "next/router";

export function Select({
	value,
	label,
	options,
	onSelect
}: {
	value?: number;
	label: string;
	onSelect?: (value: number) => void;
	options: string[];
}): JSX.Element {

	const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		if (onSelect) onSelect(Number(event.target.value));
	}, [onSelect]);

	const optionsMemoized = useMemo(() => {
		return options.map((option, i) => <option value={i} key={option}>{option}</option>)
	}, [options]);

	return <div className={styles.item}>
		<div className={styles.itemTop}>
			<span className={styles.label}>{label}</span>
		</div>
		<select value={value} onChange={handleChange}>
			{optionsMemoized}
		</select>
	</div>
}

export function QueryPicker(): JSX.Element {

	const [city, setCity] = useState(0);
	const [type, setType] = useState(0);
	const [priceBracket, setPriceBracket] = useState(0);
	const router = useRouter();

	const search = useCallback(() => {
		const params = new URLSearchParams();
		params.set('city', `${city}`);
		params.set('type', `${type}`);
		params.set('price', `${priceBracket}`);
		const url = `/search?${params.toString()}`;
		router.push(url)
	}, [city, priceBracket, type, router]);

	return <div className={styles.container}>
		<Select label="Location" value={city} onSelect={setCity} options={CITIES} />
		<Select label="Type" value={type} onSelect={setType} options={PROPERTY_TYPES} />
		<Select label="Price" value={priceBracket} onSelect={setPriceBracket} options={PRICE_BRACKETS} />
		<Button value="Search" onClick={search} icon={FaSearch} />
	</div>
}