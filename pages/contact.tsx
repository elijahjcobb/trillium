import { Nav } from "#/components/nav";
import styles from "#/styles/contact.module.css";
import Image from "next/image";
import contactImage from "#/public/contact.svg";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaMapMarkedAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Button } from "#/components/button";

function ContactRow({ icon: Icon, value, href }: { icon: IconType, value: string, href: string }) {
	return <Link className={styles.row} href={href}>
		<div className={styles.icon} >
			<Icon size={24} />
		</div>
		<span>{value}</span>
	</Link>
}

export default function Page() {
	return <div>
		<Nav />
		<div className={styles.contact}>
			<div className={styles.left}>
				<h2>Contact an Agent</h2>
				<p>Aliquam cum praesentium ratione odit enim aut perspiciatis vel qui fugiat rerum itaque.</p>
				<form id='contactForm' className={styles.form} action="https://snatch.fyi/api/entry/b397bab4-5c53-4525-aab1-ec309714fe75">
					<label htmlFor='name'>Name: *</label>
					<input id='name' required name='name' autoComplete="name" type='text' placeholder="Enter your name" />
					<label htmlFor='email'>Email: *</label>
					<input id='email' required name='email' type='email' autoComplete="email" placeholder="Enter your email" />
					<label htmlFor='phone'>Phone: *</label>
					<input id='phone' required name='phone' type='tel' autoComplete="tel" placeholder="Enter your phone" />
					<label htmlFor="goal">I want to:</label>
					<select id="goal" name="goal">
						<option value="buy">Buy</option>
						<option value="sell">Sell</option>
						<option value="rent">Rent</option>
						<option value="other">Other</option>
					</select>
					<label htmlFor="message">Anything you want to say:</label>
					<textarea id='message' name="message" rows={8} cols={30} placeholder="Tell us more..." />
				</form>
				<Button type="submit" form="contactForm" value="Submit" />
			</div>
			<div className={styles.right}>
				<Image src={contactImage} alt='contact' width={360} />
				<ContactRow icon={FaMapMarkedAlt} href='' value="Traverse City, MI" />
				<ContactRow icon={FaPhone} href='' value="210-286-8954" />
				<ContactRow icon={FaPhone} href='' value="231-409-7712" />
				<ContactRow icon={FaEnvelope} href='' value="erica@thetrilliumpartners.com" />
				<ContactRow icon={FaEnvelope} href='' value="laura@thetrilliumpartners.com" />
			</div>
		</div>
	</div>
}