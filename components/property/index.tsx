import Image, { type StaticImageData } from "next/image";
import styles from "./index.module.css";
import type { IconType } from "react-icons";
import { FaBed, FaBath, FaRuler } from "react-icons/fa";
import { useMemo } from "react";
import Link from "next/link";
import { Property as PropertyType } from "#/data/types";

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

	const formattedSqft = useMemo(() => property.sqft.toLocaleString(), [property.sqft]);

	return <Link href={`/search/${property.mls}`} className={styles.card}>
		<div className={styles.imageContainer}>
			<Image className={styles.image} width={370} height={280} alt='property picture' src={property.images[0]} />
		</div>
		<div className={styles.text}>
			<p className={styles.name}>{property.street}</p>
			<p className={styles.address}>{formattedAddress}</p>
			<p className={styles.price}>{formattedPrice}</p>
			<div className={styles.infos}>
				<PropertyInfo value={`${property.bedrooms} beds`} icon={FaBed} />
				<div className={styles.sep} />
				<PropertyInfo value={`${property.bedrooms} baths`} icon={FaBath} />
				<div className={styles.sep} />
				<PropertyInfo value={`${formattedSqft} sqft`} icon={FaRuler} />
			</div>
		</div>
	</Link>
}