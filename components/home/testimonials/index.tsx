import Image from "next/image";
import styles from "./index.module.css";
import { FaStar } from "react-icons/fa";
import { useMemo } from "react";

function Head({ image, x, y, size }: { image?: string, x: number, y: number, size: number }) {

	const delay = useMemo(() => Math.floor(Math.random() * 4), []);

	return <Image style={{ top: `${y}%`, left: `${x}%`, animationDelay: `${delay}s` }} className={styles.head} src={'https://via.placeholder.com/150'} width={size} height={size} alt='headshot' />
}

export function Testimonials() {
	return <section className={styles.container}>
		<h2>Testimonials</h2>
		<div className={styles.heads}>
			<Head x={0} y={0} size={50} />
			<Head x={80} y={0} size={80} />
			<Head x={10} y={40} size={90} />
			<Head x={25} y={10} size={80} />
			<Head x={25} y={60} size={110} />
			<Head x={65} y={35} size={110} />
			<Head x={85} y={65} size={100} />
			<Head x={45} y={45} size={140} />
			<Head x={90} y={35} size={50} />
		</div>
		<div className={styles.testimonial}>
			<p className={styles.quote}>{`"Autem deserunt architecto voluptas optio maiores est est qui a non omnis. Sunt dicta explicabo quam. Autem deserunt architecto voluptas optio maiores est est qui a non omnis. Sunt dicta explicabo quam."`}</p>
			<p className={styles.author}>John Smith</p>
			<div className={styles.stars}>
				<FaStar />
				<FaStar />
				<FaStar />
				<FaStar />
				<FaStar />
			</div>
		</div>
	</section>
}