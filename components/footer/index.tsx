import { LogoWithText } from "../logo-text";
import styles from "./index.module.css";
import Link from "next/link";

export function Footer() {
	return <footer className={styles.container}>
		<section>
			<LogoWithText size={300} />
		</section>
		<section>
			<h3>About Us</h3>
			<ul>
				<li><Link href='/about'>The Partnership</Link></li>
				<li><Link href='/about#erica'>Erica Marshall</Link></li>
				<li><Link href='/about#laura'>Laura Cobb</Link></li>
			</ul>
		</section>
		<section>
			<h3>Take Action</h3>
			<ul>
				<li><Link href='/search'>Search</Link></li>
				<li><Link href='/buying'>Buy a House</Link></li>
				<li><Link href='/selling'>List your house</Link></li>
			</ul>
		</section>
		<section>
			<h3>Connect</h3>
			<ul>
				<li><Link href='/contact'>Contact Us</Link></li>
				<li><Link target={'_blank'} href='https://www.facebook.com/traversecityrealestate.today'>Facebook</Link></li>
			</ul>
		</section>
	</footer>
}