import { Footer } from "#/components/footer"
import { Callout } from "#/components/home/callout"
import { Nav } from "#/components/nav"
import styles from "#/styles/generic.module.css";

export default function Page() {
	return <>
		<div className={styles.container}>
			<section>
				<h2>{`Sell Your Home with Confidence`}</h2>
				<p>{`Selling a home is a big decision and it's important to have the right support. With the Trillium Partners, our experienced real estate agents are here to help you every step of the way. From determining the right price to staging and marketing your home, we'll work with you to achieve a successful sale.`}</p>
			</section>
			<section>
				<h2>{`List Your Home with Us`}</h2>
				<p>{`Listing your home with the Trillium Partners means gaining access to a team of experts and a vast network of potential buyers. Our agents will provide you with a comprehensive market analysis, help you determine the right price, and develop a customized marketing plan to showcase your property. Whether you're selling a single-family home, townhouse, or condo, we've got you covered.`}</p>
			</section>
			<section>
				<h2>{`Maximize Your Home's Value`}</h2>
				<p>{`Our agents have the expertise and market knowledge to help you get the most value for your home. From home staging and minor updates to negotiating offers, we'll help you make informed decisions to ensure the best possible outcome.`}</p>
			</section>
			<section>
				<h2>{`Get Started Today`}</h2>
				<p>{`Ready to sell or list your home? Contact us today to schedule a consultation with one of our experienced real estate agents. We're here to help you every step of the way.`}</p>
			</section>
		</div>
		<Callout
			title="Start the selling process"
			subtitle="Let's chat, we would be happy to list your house. Let's start the process today!"
			cta="List My House"
		/>
	</>
}