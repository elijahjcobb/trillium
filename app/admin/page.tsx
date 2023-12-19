import { prisma } from "#/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Page(): Promise<JSX.Element> {
	const users = await prisma.user.findMany();
	return <div>
		<h1>Users</h1>
		<ul>
			{users.map((user) => <li key={user.id}><Link href={`/admin/${user.id}`}>{user.email}</Link></li>)}
		</ul>
	</div>;
}