import styles from "#/styles/contact.module.css";
import Image from "next/image";
import contactImage from "#/public/both.png";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaMapMarkedAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Button } from "#/components/button";
import { contact } from "./actions";
import { Input } from "#/components/input";

function ContactRow({ icon: Icon, value, href }: { icon: IconType, value: string, href: string }) {
	return <Link target={'_blank'} className={styles.row} href={href}>
		<div className={styles.icon} >
			<Icon size={24} />
		</div>
		<span>{value}</span>
	</Link>
}
export default async function Page({ searchParams }: {
	searchParams: {
		goal?: string;
		message?: string;
	}
}) {

	return <div className={styles.contact}>
		<div className={styles.left}>
			<h2>Contact the Trillium Partners</h2>
			<p>Aliquam cum praesentium ratione odit enim aut perspiciatis vel qui fugiat rerum itaque.</p>
			{/* @ts-expect-error - ignore action */}
			<form id='contactForm' className={styles.form} action={contact}>
				<Input label="Name" id='name' required name='name' autoComplete="name" type='text' />
				<Input label="Email" id='email' required name='email' type='email' autoComplete="email" />
				<Input label="Phone" id='phone' required name='phone' type='tel' autoComplete="tel" />
				<label htmlFor="goal">I want to:</label>
				<select defaultValue={searchParams.goal} id="goal" name="goal">
					<option value="chat">Chat</option>
					<option value="buy">Buy</option>
					<option value="sell">Sell</option>
					<option value="rent">Rent</option>
					<option value="other">Other</option>
				</select>
				<label htmlFor="message">Anything you want to say:</label>
				<textarea defaultValue={searchParams.message} id='message' name="message" rows={8} cols={30} placeholder="Tell us more..." />
			</form>
			<Button type="submit" form="contactForm" value="Submit" />
		</div>
		<div className={styles.right}>
			<Image src={contactImage} alt='contact' width={300} />
			<ContactRow icon={FaMapMarkedAlt} href='https://goo.gl/maps/fwQeyg8EtM39JdzV9' value="Traverse City, MI" />
			<ContactRow icon={FaPhone} href='tel:+12102868954' value="Erica: 210-286-8954" />
			<ContactRow icon={FaPhone} href='tel:+12314097712' value="Laura: 231-409-7712" />
			<ContactRow icon={FaEnvelope} href='mailto:erica@thetrilliumpartners.com' value="erica@thetrilliumpartners.com" />
			<ContactRow icon={FaEnvelope} href='mailto:laura@thetrilliumpartners.com' value="laura@thetrilliumpartners.com" />
		</div>
	</div>
}