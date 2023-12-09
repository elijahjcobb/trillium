import Image from "next/image";
import styles from "./index.module.css";
import type { IconType } from "react-icons";
import { FaBed, FaBath, FaRuler } from "react-icons/fa";
import { useMemo } from "react";
import Link from "next/link";
import { Property as PropertyType } from "#/data/types";

export function PropertyInfo({
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
	property
}: {
	property: PropertyType
}): JSX.Element {

	const formattedPrice = useMemo(() => {
		return `$${property.listPrice.toLocaleString()}`
	}, [property.listPrice]);

	const formattedAddress = useMemo(() => {
		return `${property.city}, ${property.zip}`
	}, [property.city, property.zip]);

	const sqft = useMemo(() => {
		if (property.sqft === 0) return property.lotSqft;
		return property.sqft;
	}, [property.lotSqft, property.sqft]);
	const formattedSqft = useMemo(() => sqft.toLocaleString(), [sqft]);

	return <Link href={`/search/${property.mls}`} className={styles.card}>
		<div className={styles.imageContainer}>
			<Image className={styles.image} width={370} height={280} alt='property picture' src={property.images[0]} />
		</div>
		<div className={styles.text}>
			<p className={styles.name}>{property.street}</p>
			<p className={styles.address}>{formattedAddress}</p>
			<p className={styles.price}>{formattedPrice}</p>
			<div className={styles.infos}>
				{property.bedrooms === 0 ? null : <PropertyInfo value={`${property.bedrooms} beds`} icon={FaBed} />}
				{property.baths === 0 ? null : <PropertyInfo value={`${property.baths} baths`} icon={FaBath} />}
				{sqft === 0 ? null : <PropertyInfo value={`${formattedSqft} sqft`} icon={FaRuler} />}
			</div>
		</div>
	</Link>
}