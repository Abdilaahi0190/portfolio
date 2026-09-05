import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useProject } from '../hooks/useProjects';
import Button from '../components/ui/Button';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug);

  if (loading) {
    return (
      <div className="container-site py-32">
        <div className="h-96 animate-pulse rounded-[28px] bg-[var(--fill)]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-site py-32 text-center">
        <h1 className="h1">Project not found</h1>
        <p className="mt-3 text-[var(--text-secondary)]">{error || 'Unavailable.'}</p>
        <Button to="/work" className="mt-8">
          Back to work
        </Button>
      </div>
    );
  }

  return (
    <article className="pt-20 lg:pt-24">
      <div className="container-site py-12 lg:py-16">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--color-brand)]"
        >
          <ArrowLeft size={16} /> All work
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="caption text-[var(--color-brand)]">
              {project.category} · {project.year}
            </p>
            <h1 className="mt-4 display text-[var(--text)]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[var(--text-secondary)]">{project.tagline}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              Role — {project.role}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {project.github && (
              <Button href={project.github} external variant="secondary">
                <Github size={16} /> GitHub
              </Button>
            )}
            {project.liveDemo && (
              <Button href={project.liveDemo} external>
                <ExternalLink size={16} /> Live / API
              </Button>
            )}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-[var(--border-secondary)] bg-[var(--bg-elevated)] shadow-[var(--shadow)]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="max-h-[560px] w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-64 items-center justify-center bg-[linear-gradient(135deg,rgba(22,119,255,0.15),transparent)]">
              <p className="h2 text-[var(--text-tertiary)]">{project.title}</p>
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <section>
              <h2 className="h2 text-[var(--text)]">Overview</h2>
              <p className="mt-4 body text-[16px]">{project.description}</p>
            </section>

            <section>
              <h2 className="h2 text-[var(--text)]">What I did</h2>
              <ul className="mt-4 space-y-3">
                {project.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-secondary)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h2 text-[var(--text)]">Key features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.features.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-[var(--border-secondary)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text-secondary)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="h-fit rounded-[24px] border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow)]">
            <h3 className="caption text-[var(--color-brand)]">Technologies</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.gallery?.length > 1 && (
              <div className="mt-8 space-y-3">
                <h3 className="caption text-[var(--color-brand)]">Gallery</h3>
                {project.gallery.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-full rounded-xl border border-[var(--border-secondary)] object-cover"
                  />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
