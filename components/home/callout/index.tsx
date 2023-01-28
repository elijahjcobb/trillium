import { Button } from "#/components/button";
import styles from "./index.module.css";

export function Callout({
	title = 'Talk to an Agent',
	subtitle = 'Quod eligendi suscipit doloremque sunt id. Accusantium explicabo minima modi ut.',
	cta = 'Connect with an Agent',
	href = '/contact'
}: {
	title?: string;
	subtitle?: string,
	cta?: string;
	href?: string;
}) {
	return <section className={styles.container}>
		<div className={styles.inner}>
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.subtitle}>{subtitle}</p>
			</div>
			<Button href={href} value={cta} />
		</div>
	</section>
}