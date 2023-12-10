import { Footer } from "#/components/footer";
import { Agents } from "#/components/home/agents";
import { Callout } from "#/components/home/callout";
import { Hero } from "#/components/home/hero";
import { Properties } from "#/components/home/properties";
import { Testimonials } from "#/components/home/testimonials";
import { topProperties } from "#/lib/search";
import styles from "#/styles/index.module.css";

export default async function Page(): Promise<JSX.Element> {

  const properties = await topProperties();

  return <div className={styles.page}>
    <div className={styles.hero}>
      <Hero />
    </div>
    <Properties properties={properties} />
    <Agents />
    <Testimonials />
    <Callout location="home" cta='Contact an Agent' subtitle="Whether you would like to buy or list, reach out and we would be happy to start the process." />
  </div>
}