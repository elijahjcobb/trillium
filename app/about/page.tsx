import { Footer } from "#/components/footer"
import { Callout } from "#/components/home/callout"
import { Nav } from "#/components/nav"
import styles from "#/styles/generic.module.css";
import Image from "next/image";
import standingImage from "#/public/standing.png";
import ericaImage from "#/public/erica.png";
import lauraImage from "#/public/laura.png";

export default function Page() {
	return <>
		<div className={styles.container}>
			<article>
				<Image width={300} src={standingImage} alt='erica and laura standing' />
				<section>
					<h2>{`The Partners`}</h2>
					<p>{`Meet Laura and Erica, cousins and lifelong friends who are partners in real estate. Growing up in Northern Michigan, they have a deep understanding of the area and a passion for helping clients find their dream homes. With [number of years] of combined experience in the industry, these two powerhouse agents bring a wealth of knowledge and expertise to the table.`}</p>
					<p>{`Whether you're buying, selling, or renting, Laura and Erica will work tirelessly to ensure that your real estate experience is seamless and stress-free. With a commitment to open communication and unparalleled attention to detail, these two agents will be your trusted advisors every step of the way. But don't let their professionalism fool you - they know how to have a good time and add a touch of humor to their work.`}</p>
					<p>{`Laura and Erica's expertise in the Northern Michigan market, combined with their strong negotiating skills and ability to understand their clients' needs, sets them apart from the competition. And with a long list of awards and accolades, it's no wonder they're considered some of the best in the business. So whether you're a first-time homebuyer, a seasoned investor, or simply looking for your next dream home, Laura and Erica have the experience and drive to help you achieve your goals. With their passion for helping clients and their commitment to excellence, they're the perfect choice for all your real estate needs.`}</p>
				</section>
			</article>
			<article id='erica'>
				<Image width={300} src={ericaImage} alt='erica and laura standing' />
				<section>
					<h2>{`Erica`}</h2>
					<p>{`Meet Erica, a seasoned real estate professional with a passion for helping clients find their dream homes. With [number of years] of experience in the industry, Erica has a deep understanding of the local market and a wealth of knowledge to offer.`}</p>
					<p>{`Whether you're buying, selling, or renting, Erica will work tirelessly to ensure that your real estate experience is seamless and stress-free. With a commitment to open communication and unparalleled attention to detail, Erica will be your trusted advisor every step of the way.`}</p>
					<p>{`If you're in the market for a new home, Erica will listen to your needs and wants, and use their expertise to find the perfect property for you. And if you're looking to sell, Erica will use their marketing skills and industry connections to get you the best price for your property.`}</p>
					<p>{`So if you're ready to take the next step in your real estate journey, reach out to Erica today. With their passion for helping clients and their commitment to excellence, they're the perfect choice for all your real estate needs.`}</p>
				</section>
			</article>
			<article id='laura'>
				<Image width={300} src={lauraImage} alt='erica and laura standing' />
				<section>
					<h2>{`Laura`}</h2>
					<p>{`Meet Laura, a dedicated and knowledgeable real estate agent with a passion for helping clients achieve their real estate goals. With [number of years] of experience in the industry, Laura has a deep understanding of the local market and a wealth of resources to offer.`}</p>
					<p>{`Laura's expertise in the local market, combined with her strong negotiating skills and ability to understand her clients' needs, sets her apart from the competition. Whether you're a first-time homebuyer, a seasoned investor, or simply looking for your next dream home, Laura has the experience and drive to help you achieve your goals.`}</p>
					<p>{`Whether you're looking to buy, sell, or rent, Laura will work tirelessly to ensure that your real estate experience is smooth, stress-free, and tailored to your unique needs. With a focus on open communication and a commitment to excellence, Laura will be your trusted advisor every step of the way.`}</p>
					<p>{`So if you're ready to take the next step in your real estate journey, reach out to Laura today. With her passion for helping clients, her commitment to excellence, and her deep understanding of the local market, she's the perfect choice for all your real estate needs.`}</p>
				</section>
			</article>
		</div>
		<Callout
			location='about'
			title="Let's talk"
			subtitle="We would be happy to list your house, or help you find a new one. Let's start the process today!"
			cta="Take Action"
		/>
	</>
}