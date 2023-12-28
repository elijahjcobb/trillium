import { verifyUser } from "#/lib/verify-user";
import { noThrow } from "@elijahjcobb/next-api";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: JSX.Element }): Promise<JSX.Element> {
	const user = await noThrow(verifyUser());
	if (user instanceof Error) redirect("/login");
	return children;
}