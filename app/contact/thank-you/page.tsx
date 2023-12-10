import styles from "#/styles/contact.module.css";
import Image from "next/image";
import contactImage from "#/public/both.png";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaMapMarkedAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Button } from "#/components/button";
import { contact } from "./actions";

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
			<h2>Thank you!</h2>
			<p>We have received your submission. We will get back to you as soon as possible.</p>
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