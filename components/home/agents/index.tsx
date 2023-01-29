import Image, { type StaticImageData } from "next/image";
import styles from "./index.module.css";
import erica from '#/public/erica.png';
import laura from '#/public/laura.png';
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaPhone } from "react-icons/fa";

function AgentSocial({ icon: Icon, href }: { icon: IconType, href: string }) {
	return <Link target='_blank' className={styles.social} href={href}>
		<Icon className={styles.icon} />
	</Link>
}

function Agent({
	name,
	image,
	title,
	phone,
	facebook,
	linkedIn,
	email
}: {
	name: string;
	image: string | StaticImageData;
	title: string;
	phone: string;
	facebook: string;
	linkedIn: string;
	email: string;
}) {
	return <div className={styles.agent}>
		<Image width={270} className={styles.image} src={image} alt='headshot' />
		<div className={styles.info}>
			<p className={styles.name}>{name}</p>
			<div className={styles.bottom}>
				<p className={styles.title}>{title}</p>
				<AgentSocial icon={FaEnvelope} href={email} />
				<AgentSocial icon={FaPhone} href={phone} />
				<AgentSocial icon={FaLinkedinIn} href={linkedIn} />
				<AgentSocial icon={FaFacebookF} href={facebook} />
			</div>
		</div>
	</div>
}

export function Agents() {
	return <section className={styles.container}>
		<h2>Meet Our Realtors</h2>
		<div className={styles.agents}>
			<Agent
				name="Erica Marshall"
				image={erica}
				title='Real Estate Broker'
				phone="tel:+12102868954"
				facebook="https://www.facebook.com/traversecityrealestate.today"
				linkedIn="https://www.linkedin.com/in/erica-slater-marshall-19a9a423/"
				email="mailto:erica@thetrilliumpartners.com"
			/>
			<Agent
				name="Laura Cobb"
				image={laura}
				title='Real Estate Agent'
				phone="tel:+12314097712"
				facebook="https://www.facebook.com/traversecityrealestate.today"
				linkedIn="https://www.linkedin.com/in/laura-cobb-a83533202/"
				email="mailto:laura@thetrilliumpartners.com"
			/>
		</div>
	</section>
}