import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { githubRepos, personal } from '../../data/personal';

export default function GitHubSection() {
  return (
    <section className="section-y border-t border-[var(--border-secondary)]">
      <div className="container-site">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="GitHub"
            title="Selected repositories."
            subtitle="Public work from my profile — no fabricated statistics."
          />
          <Button href={personal.github} external variant="secondary" className="mb-12">
            <Github size={16} /> @{personal.githubUser}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {githubRepos.map((repo, i) => (
            <motion.a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)]/40 hover:shadow-[var(--shadow)]"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Github size={16} className="text-[var(--color-brand)]" />
                  <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--color-brand)]">
                    {repo.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{repo.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--text-tertiary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-[var(--text-tertiary)] group-hover:text-[var(--color-brand)]"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
