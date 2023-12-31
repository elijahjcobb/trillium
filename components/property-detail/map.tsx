"use client";
import { Map as Mapbox } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from "#/app/map/marker";
import type { Property } from "#/data/types";
import styles from "./map.module.css";

export function PropertyMap({ property }: { property: Property }): JSX.Element {
	return <div className={styles.container}>
		<Mapbox
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
			initialViewState={{
				longitude: property.coordinates[0],
				latitude: property.coordinates[1],
				zoom: 8
			}}
			mapStyle="mapbox://styles/elijahcobb/clqpjqyu600jd01pd3tjt4224"
		>
			<Marker key={property.mls} property={property} />
		</Mapbox>
	</div>
}