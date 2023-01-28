import Image, { type StaticImageData } from "next/image";
import styles from "./index.module.css";
import erica from '#/public/erica.png';
import laura from '#/public/laura.png';
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaPhone } from "react-icons/fa";

function AgentSocial({ icon: Icon, href }: { icon: IconType, href: string }) {
	return <Link className={styles.social} href={href}>
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
	return <Link href={email} className={styles.agent}>
		<Image width={270} className={styles.image} src={image} alt='headshot' />
		<div className={styles.info}>
			<p className={styles.name}>{name}</p>
			<div className={styles.bottom}>
				<p className={styles.title}>{title}</p>
				<AgentSocial icon={FaEnvelope} href="" />
				<AgentSocial icon={FaPhone} href="" />
				<AgentSocial icon={FaLinkedinIn} href="" />
				<AgentSocial icon={FaFacebookF} href="" />
			</div>
		</div>
	</Link>
}

export function Agents() {
	return <section className={styles.container}>
		<h2>Meet Our Agents</h2>
		<div className={styles.agents}>
			<Agent
				name="Erica Marshall"
				image={erica}
				title='Real Estate Broker'
				phone="123456789"
				facebook=""
				linkedIn=""
				email=""
			/>
			<Agent
				name="Laura Cobb"
				image={laura}
				title='Real Estate Agent'
				phone="123456789"
				facebook=""
				linkedIn=""
				email=""
			/>
			<Agent
				name="Susan Cobb"
				image={laura}
				title='Finance'
				phone="123456789"
				facebook=""
				linkedIn=""
				email=""
			/>
		</div>
	</section>
}