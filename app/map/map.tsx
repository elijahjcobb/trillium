"use client";
import { Map as Mapbox } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from "./marker";
import type { Property } from "#/data/types";
import { Modal } from "./modal";
import styles from "./index.module.css";
import { useContext } from "react";
import { mapContext } from "./context";

export function Map({ properties }: { properties: Property[] }): JSX.Element {
	const { setSelectedProperty } = useContext(mapContext);
	return <div className={styles.container}>
		<Mapbox
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
			initialViewState={{
				longitude: -85.613965,
				latitude: 44.765368,
				zoom: 9
			}}
			onClick={() => {
				setSelectedProperty(null);
			}}
			mapStyle="mapbox://styles/elijahcobb/clqpjqyu600jd01pd3tjt4224"
		>
			{properties.map(p => <Marker key={p.mls} property={p} />)}
		</Mapbox>
		<Modal />
	</div>
}