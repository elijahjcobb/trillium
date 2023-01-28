import { Button } from "../button";
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import styles from "./index.module.css";

export function QueryPickerItem({
	value,
	label
}: {
	value: string;
	label: string;
}): JSX.Element {
	return <div className={styles.item}>
		<div className={styles.itemTop}>
			<span className={styles.label}>{label}</span>
			<FaChevronDown />
		</div>
		<span className={styles.value}>{value}</span>
	</div>
}

export function QueryPicker({

}: {

	}): JSX.Element {
	return <div className={styles.container}>
		<QueryPickerItem label="Location" value="Traverse City" />
		<QueryPickerItem label="Type" value="Home" />
		<QueryPickerItem label="Price" value="100k - 500k" />
		<Button value="Search" icon={FaSearch} />
	</div>
}