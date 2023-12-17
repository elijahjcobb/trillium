"use client";
import { LINKS } from "#/data/links";
import { Link as LinkType } from "#/data/types";
import Link from "next/link";
import styles from "./index.module.css";
import { Logo } from "../logo";
import { useCallback, useMemo, useState } from "react";
import { Button, RawButton } from "../button";
import { FaGripLines } from "react-icons/fa";

function NavItem({ link, onClick }: { link: LinkType, onClick?: () => void; }): JSX.Element {

	const href = useMemo(() => `/${link.href ?? link.name}`, [link]);

	return <li className={styles.listItem}>
		<Link onClick={onClick} className={styles.link} href={href}>
			{link.name}
		</Link>
	</li>
}

export function Nav(): JSX.Element {

	const [showNav, setShowNav] = useState(false);

	const toggleNav = useCallback(() => {
		setShowNav(v => !v);
	}, []);

	return <header className={styles.header}>
		<div className={styles.container}>
			<Link href='/'>
				<Logo />
			</Link>
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{LINKS.map(link => <NavItem key={link.name} link={link} />)}
				</ul>
				<Button href="/favorites" value="Favorites" />
				<Button value='Contact' href="/contact" />
			</nav>
			<RawButton onClick={toggleNav} className={styles.hamburger}>
				<FaGripLines className={styles.btn} style={{
					transform: `rotate(${showNav ? 90 : 0}deg)`
				}} size={32} />
			</RawButton>
			<div style={{ display: showNav ? "flex" : "none" }} className={styles.mobileMenu}>
				<ul className={styles.mobileList}>
					{[...LINKS, { href: "contact", name: "Contact" }].map(link => <NavItem onClick={() => setShowNav(false)} key={link.name} link={link} />)}
				</ul>
			</div>
		</div>
	</header>
}