import Hero from '../components/hero/Hero';
import About from '../components/about/About';
import FeaturedWork from '../components/work/FeaturedWork';
import HowIBuild from '../components/approach/HowIBuild';
import TechStack from '../components/skills/TechStack';
import Journey from '../components/journey/Journey';
import Contact from '../components/contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork limit={4} showAllLink={false} />
      <HowIBuild />
      <TechStack />
      <Journey />
      <Contact />
    </>
  );
}
