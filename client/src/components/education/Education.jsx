import { Reveal } from '../ui/Motion';
import SectionHeading from '../ui/SectionHeading';
import { education } from '../../data/personal';

export default function Education() {
  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading eyebrow="Education" title="Academic foundation." />

        <div className="grid gap-5">
          {education.map((item) => (
            <Reveal key={item.school}>
              <div className="rounded-[24px] border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="h3 text-[var(--text)]">{item.school}</h3>
                    <p className="mt-2 text-base text-[var(--text-secondary)]">{item.degree}</p>
                  </div>
                  <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-tertiary)]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.details}
                </p>
                {item.note && (
                  <p className="mt-4 text-xs text-[var(--color-brand)]">{item.note}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
