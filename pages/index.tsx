import { Footer } from "#/components/footer";
import { Agents } from "#/components/home/agents";
import { Callout } from "#/components/home/callout";
import { Hero } from "#/components/home/hero";
import { Properties } from "#/components/home/properties";
import { Testimonials } from "#/components/home/testimonials";
import { Nav } from "#/components/nav";
import { Property } from "#/data/types";
import { topProperties } from "#/helpers/search";
import styles from "#/styles/index.module.css";
import { GetStaticProps } from "next";

export default function Page({ properties }: { properties: Property[] }): JSX.Element {
  return <div className={styles.page}>
    <Nav />
    <div className={styles.hero}>
      <Hero />
    </div>
    <Properties properties={properties} />
    <Agents />
    <Testimonials />
    <Callout cta='Contact an Agent' subtitle="Whether you would like to buy or list, reach out and we would be happy to start the process." />
    <Footer />
  </div>
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      properties: await topProperties()
    }
  }
}