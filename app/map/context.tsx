"use client";
import type { Property } from "#/data/types";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface MapContext {
	selectedProperty: Property | null;
	setSelectedProperty: Dispatch<SetStateAction<Property | null>>
}

export const mapContext = createContext<MapContext>({} as MapContext);

export function MapContextProvider({ children }: { children: JSX.Element }): JSX.Element {
	const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
	return <mapContext.Provider
		value={{
			selectedProperty,
			setSelectedProperty
		}}
	>
		{children}
	</mapContext.Provider>
}
