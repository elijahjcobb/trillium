import { Footer } from "#/components/footer";
import { Agents } from "#/components/home/agents";
import { Callout } from "#/components/home/callout";
import { Hero } from "#/components/home/hero";
import { Properties } from "#/components/home/properties";
import { Testimonials } from "#/components/home/testimonials";
import { Nav } from "#/components/nav";
import styles from "#/styles/index.module.css";

export default function Page(): JSX.Element {
  return <div className={styles.page}>
    <Nav />
    <div className={styles.hero}>
      <Hero />
    </div>
    <Properties />
    <Agents />
    <Testimonials />
    <Callout cta='Contact an Agent' subtitle="Whether you would like to buy or list, reach out and we would be happy to start the process." />
    <Footer />
  </div>
}