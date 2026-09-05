import About from '../components/about/About';
import Journey from '../components/journey/Journey';
import Education from '../components/education/Education';
import HowIBuild from '../components/approach/HowIBuild';

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-[72px]">
      <About />
      <Journey />
      <HowIBuild />
      <Education />
    </div>
  );
}
