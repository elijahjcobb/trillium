import { Button } from "#/components/button";
import { Property } from "#/components/property";
import { FaArrowRight } from "react-icons/fa";
import styles from "./index.module.css";
import homeImage from "#/public/home.png";

export function Properties(): JSX.Element {
	return <section className={styles.container}>
		<h2>Top Properties</h2>
		<p className={styles.subtitle}>Iste excepturi eaque consequatur laborum sit architecto voluptatem asperiores.</p>
		<div className={styles.properties}>
			<Property
				mls='1'
				name='Modern Apartment in City'
				address="119 Houston Ave, Newport, RL 22928"
				price={599000}
				beds={4}
				bathrooms={4}
				sqft={1200}
				image={homeImage}
			/>
			<Property
				mls='1'
				name='Modern Apartment in City'
				address="119 Houston Ave, Newport, RL 22928"
				price={599000}
				beds={4}
				bathrooms={4}
				sqft={1200}
				image={homeImage}
			/>
			<Property
				mls='1'
				name='Modern Apartment in City'
				address="119 Houston Ave, Newport, RL 22928"
				price={599000}
				beds={4}
				bathrooms={4}
				sqft={1200}
				image={homeImage}
			/>
			<Property
				mls='1'
				name='Modern Apartment in City'
				address="119 Houston Ave, Newport, RL 22928"
				price={599000}
				beds={4}
				bathrooms={4}
				sqft={1200}
				image={homeImage}
			/>
			<Property
				mls='1'
				name='Modern Apartment in City'
				address="119 Houston Ave, Newport, RL 22928"
				price={599000}
				beds={4}
				bathrooms={4}
				sqft={1200}
				image={homeImage}
			/>
			<Property
				mls='1'
				name='Modern Apartment in City'
				address="119 Houston Ave, Newport, RL 22928"
				price={599000}
				beds={4}
				bathrooms={4}
				sqft={1200}
				image={homeImage}
			/>
		</div>
		<Button href='/properties' value='View all Properties' postIcon={FaArrowRight} />
	</section>
}