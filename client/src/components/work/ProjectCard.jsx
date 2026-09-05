import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Reveal } from '../ui/Motion';

const categoryLabel = {
  mobile: 'Mobile',
  fullstack: 'Full-Stack',
  backend: 'Backend',
  research: 'Research',
  web: 'Web',
};

export function FeaturedProject({ project }) {
  if (!project) return null;

  return (
    <Reveal>
      <article className="group overflow-hidden rounded-[28px] border border-[var(--border-secondary)] bg-[var(--bg-elevated)] shadow-[var(--shadow)]">
        <Link to={`/work/${project.slug}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-muted)]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-end bg-[linear-gradient(135deg,rgba(22,119,255,0.18),transparent_50%)] p-8">
                <p className="h2 text-[var(--text)]">{project.title}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              Featured · {categoryLabel[project.category] || project.category}
            </span>
          </div>
        </Link>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
          <div>
            <Link to={`/work/${project.slug}`} className="group/title inline-flex items-start gap-3">
              <h3 className="h2 text-[var(--text)] transition group-hover/title:text-[var(--color-brand)]">
                {project.title}
              </h3>
              <ArrowUpRight
                size={22}
                className="mt-2 shrink-0 text-[var(--text-tertiary)] transition group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:text-[var(--color-brand)]"
              />
            </Link>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--text-secondary)]">
              {project.description || project.tagline}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
              {project.role}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 8).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/work/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)] hover:underline"
              >
                View project <ArrowUpRight size={14} />
              </Link>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--color-brand)]"
                >
                  <Github size={14} /> GitHub
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--color-brand)]"
                >
                  <ExternalLink size={14} /> Live
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectCard({ project, index = 0, variant = 'default' }) {
  const isWide = variant === 'wide';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group overflow-hidden rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-brand)]/40 hover:shadow-[var(--shadow)] ${
        isWide ? 'md:col-span-2' : ''
      }`}
    >
      <Link to={`/work/${project.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-muted)]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full flex-col justify-between bg-[linear-gradient(145deg,rgba(22,119,255,0.14),transparent_55%)] p-6">
              <span className="caption text-[var(--color-brand)]">
                {categoryLabel[project.category] || project.category}
              </span>
              <p className="h3 text-[var(--text)]">{project.title}</p>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-elevated)]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] backdrop-blur">
            {categoryLabel[project.category] || project.category}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--text)] transition group-hover:text-[var(--color-brand)]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.tagline}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-[var(--text-tertiary)] transition group-hover:text-[var(--color-brand)]"
            />
          </div>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            {project.role}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--text-tertiary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {(project.github || project.liveDemo) && (
        <div className="flex gap-4 border-t border-[var(--border-secondary)] px-5 py-3.5 sm:px-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--color-brand)]"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--color-brand)]"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
