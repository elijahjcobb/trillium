import { LINKS } from "#/data/links";
import { Link as LinkType } from "#/data/types";
import Link from "next/link";
import styles from "./index.module.css";
import { Logo } from "../logo";
import { useMemo } from "react";
import { Button } from "../button";


function NavItem({ link }: { link: LinkType }): JSX.Element {

	const href = useMemo(() => `/${link.href ?? link.name}`, [link]);

	return <li className={styles.listItem}>
		<Link className={styles.link} href={href}>
			{link.name}
		</Link>
	</li>
}

export function Nav(): JSX.Element {
	return <header className={styles.header}>
		<div className={styles.container}>
			<Link href='/'>
				<Logo />
			</Link>
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{LINKS.map(link => <NavItem key={link.name} link={link} />)}
				</ul>
				<Button value='Contact' href="/contact" />
			</nav>
		</div>
	</header>
}