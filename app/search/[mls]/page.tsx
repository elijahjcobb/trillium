import { Callout } from "#/components/home/callout";
import { PropertyDetail } from "#/components/property-detail";
import { propertyById } from "#/helpers/search";

export default async function Page({ params }: { params: { mls: string } }) {
	const property = await propertyById(params.mls);

	if (!property) {
		throw new Error("Property not found");
	}

	return <>
		<PropertyDetail property={property} />
		<Callout
			cta="Contact"
			title="Like what you see?"
			subtitle="If you would like to make an offer on this property, or just find out more, we can help."
		/>
	</>
}