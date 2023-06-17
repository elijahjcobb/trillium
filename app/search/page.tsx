import { Callout } from "#/components/home/callout";
import { Property } from "#/data/types";
import { convertBracketsToQuery } from "#/helpers/convert";
import { search, topProperties } from "#/helpers/search";
import { Properties } from "./properties";

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: { city: string, type: string, price: string } }) {

	let properties: Property[] = [];

	if (Object.keys(searchParams)) {
		properties = await search(convertBracketsToQuery({
			beds: 0,
			baths: 0,
			sqft: 0,
			yearBuilt: 0,
			city: parseInt(searchParams['city'] as string),
			type: parseInt(searchParams['type'] as string),
			price: parseInt(searchParams['price'] as string),
		}));
	}

	if (properties.length === 0) {
		properties = await topProperties(30);
	}

	return <>
		<Properties properties={properties} />
		<Callout
			subtitle="If you have found something you like, let us know, we can start the process today."
			cta="Start the buying process"
			title="Find something you like?" />
	</>
}