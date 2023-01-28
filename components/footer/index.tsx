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
				<li><Link href=''>hi</Link></li>
				<li><Link href=''>hello</Link></li>
				<li><Link href=''>foo</Link></li>
				<li><Link href=''>bar</Link></li>
			</ul>
		</section>
		<section>
			<h3>Resources</h3>
			<ul>
				<li><Link href=''>hi</Link></li>
				<li><Link href=''>hello</Link></li>
				<li><Link href=''>foo</Link></li>
				<li><Link href=''>bar</Link></li>
			</ul>
		</section>
		<section>
			<h3>Contact Us</h3>
			<ul>
				<li><Link href=''>Foo</Link></li>
				<li><Link href=''>Bar</Link></li>
				<li><Link href=''>foo</Link></li>
				<li><Link href=''>bar</Link></li>
			</ul>
		</section>
	</footer>
}