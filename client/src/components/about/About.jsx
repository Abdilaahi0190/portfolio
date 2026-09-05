import { Reveal, Stagger, StaggerItem } from '../ui/Motion';
import SectionHeading from '../ui/SectionHeading';
import { personal } from '../../data/personal';

export default function About() {
  return (
    <section id="about" className="section-y">
      <div className="container-site grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="About"
            title="A developer who ships across the stack — with mobile at the center."
            subtitle={personal.aboutLead}
          />
          <div className="space-y-5">
            {personal.aboutBody.map((para) => (
              <Reveal key={para.slice(0, 24)}>
                <p className="body text-[16px]">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {personal.focusAreas.map((item, i) => (
            <StaggerItem key={item.label}>
              <div className="group h-full rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-brand)] hover:shadow-[var(--shadow)]">
                <p className="font-mono text-xs font-semibold text-[var(--color-brand)]">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
