import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard, { FeaturedProject } from '../components/work/ProjectCard';
import GitHubSection from '../components/github/GitHubSection';
import { useProjects } from '../hooks/useProjects';

export default function WorkPage() {
  const { projects, loading } = useProjects({ featured: true });
  const list = projects || [];
  const mobile = list.filter((p) => p.category === 'mobile');
  const web = list.filter((p) => p.category === 'fullstack' || p.category === 'web');

  return (
    <div className="pt-16 lg:pt-[72px]">
      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Selected work"
            title="Work"
            subtitle="Projects across mobile and web — Flutter apps and full-stack systems."
          />

          {loading ? (
            <div className="space-y-6">
              <div className="h-96 animate-pulse rounded-[28px] bg-[var(--fill)]" />
            </div>
          ) : (
            <div className="space-y-12">
              <div>
                <p className="caption mb-5 text-[var(--color-brand)]">Mobile apps</p>
                <div className="grid gap-6 md:grid-cols-2">
                  {mobile.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                  ))}
                </div>
              </div>

              <div>
                <p className="caption mb-5 text-[var(--color-brand)]">Web systems</p>
                <div className="space-y-6">
                  {web[0] && <FeaturedProject project={web[0]} />}
                  {web.slice(1).map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <GitHubSection />
    </div>
  );
}
