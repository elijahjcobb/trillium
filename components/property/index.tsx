import Image, { type StaticImageData } from "next/image";
import styles from "./index.module.css";
import type { IconType } from "react-icons";
import { FaBed, FaBath, FaRuler } from "react-icons/fa";
import { useMemo } from "react";
import Link from "next/link";

function PropertyInfo({
	value,
	icon: Icon
}: {
	value: string,
	icon: IconType
}): JSX.Element {
	return <div className={styles.info}>
		<span className={styles.infoValue}>{value}</span>
		<Icon className={styles.infoIcon} />
	</div>
}

export function Property({
	name,
	address,
	price,
	beds,
	bathrooms,
	sqft,
	image,
	mls
}: {
	name: string;
	address: string;
	price: number;
	beds: number;
	bathrooms: number;
	sqft: number;
	image: string | StaticImageData;
	mls: string;
}): JSX.Element {

	const formattedPrice = useMemo(() => {
		return `$${price.toLocaleString()}`
	}, [price]);

	return <Link href={`/properties/${mls}`} className={styles.card}>
		<div className={styles.imageContainer}>
			<Image className={styles.image} width={370} height={280} alt='property picture' src={image} />
		</div>
		<div className={styles.text}>
			<p className={styles.name}>{name}</p>
			<p className={styles.address}>{address}</p>
			<p className={styles.price}>{formattedPrice}</p>
			<div className={styles.infos}>
				<PropertyInfo value={`${beds} beds`} icon={FaBed} />
				<div className={styles.sep} />
				<PropertyInfo value={`${bathrooms} beds`} icon={FaBath} />
				<div className={styles.sep} />
				<PropertyInfo value={`${sqft} sqft`} icon={FaRuler} />
			</div>
		</div>
	</Link>
}