import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Smartphone, Globe, Server, Database, Wrench } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { skillGroups } from '../../data/skills';

const icons = {
  mobile: Smartphone,
  frontend: Globe,
  backend: Server,
  database: Database,
  tools: Wrench,
};

export default function TechStack() {
  const [active, setActive] = useState(skillGroups[0].id);
  const current = skillGroups.find((g) => g.id === active) || skillGroups[0];
  const Icon = icons[current.id] || Smartphone;

  return (
    <section id="skills" className="section-y border-y border-[var(--border-secondary)] bg-[var(--bg-elevated)]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Skills"
          title="A technology ecosystem built around Flutter — with full-stack depth."
          subtitle="Interactive stack map. Mobile is the core specialization; web, APIs, and databases extend the engineering range."
        />

        <div className="flex flex-wrap gap-2">
          {skillGroups.map((group) => {
            const GIcon = icons[group.id] || Smartphone;
            const isActive = active === group.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActive(group.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? group.prominent
                      ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white shadow-[0_0_0_3px_rgba(22,119,255,0.15)]'
                      : 'border-[var(--color-brand)] bg-[var(--fill)] text-[var(--color-brand)]'
                    : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]'
                }`}
              >
                <GIcon size={15} />
                {group.title}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`mt-8 rounded-3xl border p-6 sm:p-8 ${
              current.prominent
                ? 'border-[var(--color-brand)]/30 bg-[linear-gradient(135deg,rgba(22,119,255,0.08),transparent_55%)]'
                : 'border-[var(--border-secondary)] bg-[var(--bg)]'
            }`}
          >
            <div className="mb-8 flex items-end justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="h3 text-[var(--text)]">{current.title}</h3>
                  {current.prominent && (
                    <p className="mt-1 text-sm text-[var(--color-brand)]">Primary specialization</p>
                  )}
                </div>
              </div>
              <p className="font-mono text-xs text-[var(--text-tertiary)]">
                {current.items.length} technologies
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {current.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="cursor-default rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text)] shadow-sm transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:shadow-[var(--shadow)]"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
