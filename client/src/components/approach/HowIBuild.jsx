import { Stagger, StaggerItem } from '../ui/Motion';
import SectionHeading from '../ui/SectionHeading';
import { approach } from '../../data/personal';

export default function HowIBuild() {
  return (
    <section className="section-y border-y border-[var(--border-secondary)] bg-[var(--bg-elevated)]">
      <div className="container-site">
        <SectionHeading
          eyebrow="How I build"
          title="A clear path from problem to polished product."
          subtitle="Understand → design → develop → connect → data → improve."
        />

        <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {approach.map((item) => (
            <StaggerItem key={item.step}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg)] p-6 transition hover:-translate-y-1 hover:border-[var(--color-brand)]/40 hover:shadow-[var(--shadow)]">
                <div className="absolute -right-2 -top-4 text-7xl font-semibold text-[var(--fill)] transition group-hover:text-[rgba(22,119,255,0.08)]">
                  {item.step}
                </div>
                <p className="font-mono text-sm font-semibold text-[var(--color-brand)]">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
