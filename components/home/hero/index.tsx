import Image from "next/image";
import styles from "./index.module.css";
import bothImage from "#/public/both.png";
import { QueryPicker } from "../../query-picker";

export function Hero(): JSX.Element {
	return <div className={styles.hero}>
		<p className={styles.title}>{`Let's find a home that's perfect for you.`}</p>
		<p className={styles.subtitle}>{`Ullam rerum culpa sed eius libero dolores tempore hic quo dolore temporibus recusandae libero voluptas.`}</p>
		<Image width={700} src={bothImage} alt='house image' className={styles.house} />
		<QueryPicker />
	</div>
}