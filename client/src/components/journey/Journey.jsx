import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { journey } from '../../data/journey';

export default function Journey() {
  return (
    <section id="journey" className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Development journey"
          title="How the craft took shape — verified by real projects."
          subtitle="A timeline grounded in GitHub activity and shipped work. No fabricated employment history."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-[var(--color-brand)] via-[var(--border)] to-transparent sm:left-[19px]" />

          <div className="space-y-6">
            {journey.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="relative grid grid-cols-[32px_1fr] gap-5 sm:grid-cols-[40px_1fr] sm:gap-7"
              >
                <div className="relative z-10 mt-5 flex justify-center">
                  <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[var(--color-brand)] bg-[var(--bg)] shadow-[0_0_0_4px_rgba(22,119,255,0.15)]" />
                </div>
                <div className="rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-5 transition hover:border-[var(--color-brand)]/35 hover:shadow-[var(--shadow)] sm:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                      {item.year}
                    </p>
                    {item.evidence && (
                      <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--text-tertiary)]">
                        {item.evidence}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
