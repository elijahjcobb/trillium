"use client";
/* eslint-disable @next/next/no-img-element */
import { Property } from "#/data/types";
import styles from "#/styles/property-detail.module.css";
import { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { FaBed, FaBath, FaRuler, FaWind, FaCalendar, FaTree, FaRegBuilding, FaRobot, FaWater, FaDollarSign } from "react-icons/fa";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import type { IconType } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Button } from "../button";
import classNames from "classnames";
import Link from "next/link";

function PropertySpec({ icon: Icon, value }: { icon: IconType, value: string }): JSX.Element {
	return <li className={styles.spec}>
		<Icon className={styles.specIcon} />
		<p>{value}</p>
	</li>
}

function FullScreenImage({
	images,
	index,
	setIndex
}: {
	images: string[],
	index: number | null,
	setIndex: Dispatch<SetStateAction<number | null>>;
}): JSX.Element {

	useEffect(() => {
		if (index !== null) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	}, [index]);

	const currentImage = useMemo(() => index === null ? undefined : images[index], [images, index]);

	const deltaImageIndex = useCallback((delta: number) => {
		setIndex(old => {
			let newValue = (old ?? 0) + delta;
			if (newValue >= images.length) newValue = 0;
			if (newValue < 0) newValue = images.length - 1;
			return newValue;
		});
	}, [images, setIndex]);

	const previousImage = useCallback((ev?: MouseEvent<HTMLButtonElement>) => {
		ev?.stopPropagation();
		deltaImageIndex(-1);
	}, [deltaImageIndex]);

	const nextImage = useCallback((ev?: MouseEvent<HTMLButtonElement>) => {
		ev?.stopPropagation();
		deltaImageIndex(1);
	}, [deltaImageIndex]);

	const close = useCallback(() => setIndex(null), [setIndex]);

	useEffect(() => {
		const listener = (ev: KeyboardEvent) => {
			switch (ev.key) {
				case 'ArrowLeft':
				case 'a':
				case 'A':
					previousImage();
					break;
				case 'ArrowRight':
				case 'd':
				case 'D':
					nextImage();
					break;
				case 'Escape':
					close();
					break;
			}
		};
		document.addEventListener('keydown', listener);
		return () => document.removeEventListener("keydown", listener);
	}, [nextImage, previousImage, close]);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
	}, [index])

	const handleOnLoad = useCallback(() => {
		setIsLoading(false);
	}, []);

	return <button onClick={close} className={classNames(styles.fullScreenContainer, index !== null && styles.showFullScreen)}>
		<img style={{ filter: `opacity(${isLoading ? 0 : 1})` }} onLoad={handleOnLoad} src={currentImage} alt='property shot' className={styles.fullScreenImage} />
		<AiOutlineLoading3Quarters className={styles.loader} />
		<button className={styles.previousButton} onClick={previousImage}><IoChevronBack size={24} /></button>
		<button className={styles.nextButton} onClick={nextImage}><IoChevronForward size={24} /></button>
		<button className={styles.closeButton}><IoClose size={24} /></button>
	</button>
}

export function PropertyDetail({ property }: { property: Property }): JSX.Element {

	const price = useMemo(() => `$${property.listPrice.toLocaleString()}`, [property.listPrice]);
	const sqft = useMemo(() => `${property.sqft.toLocaleString()} sqft`, [property.sqft]);
	const builtIn = useMemo(() => `Built in ${property.yearBuilt}`, [property.yearBuilt]);
	const acres = useMemo(() => `${property.acres.toFixed(1)} Acres`, [property.acres]);
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

	const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);

	return <div className={styles.container}>
		<FullScreenImage images={property.images} index={fullScreenIndex} setIndex={setFullScreenIndex} />
		<div className={styles.images}>
			{property.images.map((image, i) => {
				return <button onClick={() => setFullScreenIndex(i)} key={image} className={styles.imageWrapper}>
					<img
						className={styles.image}
						loading="lazy"
						src={image}
						alt='property image' />
				</button>;
			})}
		</div>
		<div className={styles.right}>
			<p className={styles.price}>{price}</p>
			<Link href={`https://www.google.com/maps/place/${property.address},+${property.zip}`} target="_blank" className={styles.address}>{property.address}</Link>
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