import { Footer } from "#/components/footer"
import { Callout } from "#/components/home/callout"
import { Nav } from "#/components/nav"
import styles from "#/styles/generic.module.css";

export default function Page() {
	return <>
		<div className={styles.container}>
			<section>
				<h2>{`Find Your Dream Home with the Trillium Partners`}</h2>
				<p>{`Buying a home is a big decision and finding the right one can be a challenge. At the Trillium Partners, our experienced real estate agents are here to help you every step of the way. From finding the right neighborhood to navigating the home buying process, we'll be by your side every step of the way.`}</p>
			</section>
			<section>
				<h2>{`Explore Your Options`}</h2>
				<p>{`With a vast network of properties and a wealth of resources at our disposal, our agents will help you find the perfect home to meet your needs. Whether you're looking for a single-family home, townhouse, or condo, we've got you covered.`}</p>
			</section>
			<section>
				<h2>{`Navigate the Home Buying Process`}</h2>
				<p>{`The home buying process can be complex, but with the Trillium Partners, you'll have the support of experienced real estate agents every step of the way. From pre-approval and making an offer to closing the deal, we'll guide you through the process with confidence.`}</p>
			</section>
			<section>
				<h2>{`Get Started Today`}</h2>
				<p>{`Ready to find your dream home? Contact us today to schedule a consultation with one of our experienced real estate agents. We're here to help you every step of the way.`}</p>
			</section>
		</div>
		<Callout
			location='buying'
			title="Start the buying process"
			cta="Start Buying Today"
			href="/contact?goal=buy"
			subtitle="Whether you are ready or not quite yet, reach out and we would be happy to start the process."
		/>
	</>
}