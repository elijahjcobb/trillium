import { Marker as MapboxMarker } from "react-map-gl"
import { HiHome } from "react-icons/hi";
import styles from "./marker.module.css";
import { MouseEvent, useCallback, useContext } from "react";
import { mapContext } from "./context";
import type { Property } from "#/data/types";

export function Marker({ property }: { property: Property; }): JSX.Element {

	const { setSelectedProperty } = useContext(mapContext);

	const handleClick = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
		ev.stopPropagation();
		setSelectedProperty(property);
	}, [property, setSelectedProperty]);

	return <MapboxMarker latitude={property.coordinates[1]} longitude={property.coordinates[0]}>
		<button onClick={handleClick} className={styles.marker}>
			<HiHome className={styles.icon} />
		</button>
	</MapboxMarker>
}