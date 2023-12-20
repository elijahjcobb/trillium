import { prisma } from "#/lib/prisma";
import { propertyById } from "#/lib/search";
import { verifyUser } from "#/lib/verify-user";
import { Property } from "#/data/types";
import { Properties } from "../search/properties";

export const dynamic = 'force-dynamic';

export default async function Page(): Promise<JSX.Element> {
	const { user } = await verifyUser();
	const favorites = await prisma.favorite.findMany({ where: { userId: user.id } });
	const nullableProperties = await Promise.all(favorites.map(favorite => propertyById(favorite.mls)))
	const properties = nullableProperties.filter((p): p is Property => p !== null);
	return <Properties title="Favorites" hideQueryBar properties={properties} />
}