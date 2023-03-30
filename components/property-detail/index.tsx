/* eslint-disable @next/next/no-img-element */
import { Property } from "#/data/types";
import styles from "#/styles/property-detail.module.css";
import { useMemo } from "react";
import { FaBed, FaBath, FaRuler, FaWind, FaCalendar, FaTree, FaRegBuilding, FaRobot, FaWater, FaDollarSign } from "react-icons/fa";
import type { IconType } from "react-icons";
import { Button } from "../button";

function PropertySpec({ icon: Icon, value }: { icon: IconType, value: string }): JSX.Element {
	return <li className={styles.spec}>
		<Icon className={styles.specIcon} />
		<p>{value}</p>
	</li>
}

export function PropertyDetail({ property }: { property: Property }): JSX.Element {

	const price = useMemo(() => `$${property.listPrice.toLocaleString()}`, [property.listPrice]);
	const sqft = useMemo(() => `${property.sqft.toLocaleString()} sqft`, [property.sqft]);
	const builtIn = useMemo(() => `Built in ${property.yearBuilt}`, [property.yearBuilt]);
	const acres = useMemo(() => `${property.acres} Acres`, [property.acres]);
	const pricePerSQFT = useMemo(() => `$${Math.floor(property.listPrice / property.sqft)} price/sqft`, [property.listPrice, property.sqft]);
	const appliances = useMemo(() => property.appliances.join(", "), [property.appliances]);
	const hvac = useMemo(() => property.hvac.join(", "), [property.hvac]);
	const water = useMemo(() => property.water === 'municipal' ? "Private Well" : "City Water", [property.water]);
	const type = useMemo(() => {
		switch (property.type) {
			case 'lnd':
				return "Land";
			case "mul":
				return "Multi-Family Home";
			case "res":
				return "Single Family Residence";
			default:
				return "Property";
		}
	}, [property.type]);

	const bedrooms = useMemo(() => `${property.bedrooms} bedrooms`, [property.bedrooms]);
	const bathrooms = useMemo(() => `${property.bedrooms} bathrooms`, [property.bedrooms]);

	return <div className={styles.container}>
		<div className={styles.images}>
			{property.images.map(image => {
				return <img
					key={image}
					loading="lazy"
					src={image}
					alt='property image' />;
			})}
		</div>
		<div className={styles.right}>
			<p className={styles.price}>{price}</p>
			<p className={styles.address}>{property.address}</p>
			<ul className={styles.specs}>
				<PropertySpec icon={FaBed} value={bedrooms} />
				<PropertySpec icon={FaBath} value={bathrooms} />
				<PropertySpec icon={FaRuler} value={sqft} />
				<PropertySpec icon={FaRegBuilding} value={type} />
				<PropertySpec icon={FaCalendar} value={builtIn} />
				<PropertySpec icon={FaWater} value={water} />
				<PropertySpec icon={FaWind} value={hvac} />
				<PropertySpec icon={FaTree} value={acres} />
				<PropertySpec icon={FaDollarSign} value={pricePerSQFT} />
				<PropertySpec icon={FaRobot} value={appliances} />
			</ul>
			{property.virtualTour ? <Button newTab href={property.virtualTour} value="View Virtual Tour" /> : null}
		</div>
	</div>

}