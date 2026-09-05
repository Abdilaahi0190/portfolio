import SectionHeading from '../ui/SectionHeading';
import ProjectCard, { FeaturedProject } from './ProjectCard';
import { useProjects } from '../../hooks/useProjects';

export default function FeaturedWork({ limit = 4 }) {
  const { projects, loading } = useProjects({ featured: true });
  const list = (projects || []).slice(0, limit);
  const mobile = list.filter((p) => p.category === 'mobile');
  const web = list.filter((p) => p.category === 'fullstack' || p.category === 'web');

  return (
    <section id="work" className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Selected work"
          title="Work"
          subtitle="Projects across mobile and web — Flutter apps and full-stack systems."
        />

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-[var(--fill)]" />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {mobile.length > 0 && (
              <div>
                <p className="caption mb-4 text-[var(--color-brand)]">Mobile apps</p>
                <div className="grid gap-6 md:grid-cols-2">
                  {mobile.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                  ))}
                </div>
              </div>
            )}

            {web.length > 0 && (
              <div>
                <p className="caption mb-4 text-[var(--color-brand)]">Web systems</p>
                <div className="space-y-6">
                  {web[0] && <FeaturedProject project={web[0]} />}
                  {web.slice(1).length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {web.slice(1).map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!mobile.length && !web.length && (
              <p className="text-[var(--text-secondary)]">Projects will appear here soon.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
