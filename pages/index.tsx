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
    <div className={styles.hero}>
      <Nav />
      <Hero />
    </div>
    <Properties />
    <Agents />
    <Testimonials />
    <Callout />
    <Footer />
  </div>
}