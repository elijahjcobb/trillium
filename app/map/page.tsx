import { Map } from "./map";
import { MapContextProvider } from "./context";
import { search } from "#/lib/search";

export default async function Page(): Promise<JSX.Element> {
	const properties = await search({});
	return <MapContextProvider>
		<Map properties={properties} />
	</MapContextProvider>
}