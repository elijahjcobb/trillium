import { Footer } from "#/components/footer";
import { Callout } from "#/components/home/callout";
import { Nav } from "#/components/nav";
import { PropertyDetail } from "#/components/property-detail";
import { Property } from "#/data/types";
import { propertyById } from "#/helpers/search";
import { GetServerSideProps } from "next";

interface Props {
	property: Property;
}
export default function Page(props: Props) {
	return <>
		<Nav />
		<PropertyDetail property={props.property} />
		<Callout
			cta="Contact"
			title="Like what you see?"
			subtitle="If you would like to make an offer on this property, or just find out more, we can help."
		/>
		<Footer />
	</>
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

	const mls = context.params?.mls;

	if (typeof mls !== 'string') {
		return { redirect: { destination: '/search', permanent: false } }
	}

	const property = await propertyById(mls);

	if (!property) {
		return { redirect: { destination: '/search', permanent: false } }
	}

	return {
		props: {
			property
		}
	}
}