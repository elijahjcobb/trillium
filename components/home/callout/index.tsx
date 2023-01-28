import { Button } from "#/components/button";
import styles from "./index.module.css";

export function Callout() {
	return <section className={styles.container}>
		<div className={styles.inner}>
			<div className={styles.text}>
				<p className={styles.title}>Talk to an Agent</p>
				<p className={styles.subtitle}>Quod eligendi suscipit doloremque sunt id. Accusantium explicabo minima modi ut.</p>
			</div>
			<Button value='Connect with an Agent' />
		</div>
	</section>
}