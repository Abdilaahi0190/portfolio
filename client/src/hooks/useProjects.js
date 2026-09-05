import { useEffect, useState } from 'react';
import { fallbackProjects } from '../data/projects';

const bySlug = Object.fromEntries(fallbackProjects.map((p) => [p.slug, p]));

function enrichProject(project) {
  if (!project) return project;
  const seed = bySlug[project.slug];
  if (!seed) return project;
  return {
    ...project,
    image: project.image || seed.image || '',
    gallery:
      Array.isArray(project.gallery) && project.gallery.length > 0
        ? project.gallery
        : seed.gallery || [],
  };
}

export function useProjects({ featured } = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const qs = featured ? '?featured=true' : '';
        const res = await fetch(`/api/projects${qs}`);
        if (!res.ok) throw new Error('Failed to fetch projects');
        const json = await res.json();
        const data = (json.data || [])
          .map(enrichProject)
          .filter((p) => p.slug !== 'waafi-cargo');
        if (!cancelled) setProjects(data);
      } catch (err) {
        if (!cancelled) {
          const local = (featured
            ? fallbackProjects.filter((p) => p.featured)
            : fallbackProjects
          ).filter((p) => p.slug !== 'waafi-cargo');
          setProjects(local);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [featured]);

  return { projects, loading, error };
}

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return undefined;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        const item = enrichProject(json.data);
        if (!cancelled) {
          if (item?.slug === 'waafi-cargo') {
            setProject(null);
            setError('Not found');
          } else {
            setProject(item);
          }
        }
      } catch (err) {
        if (!cancelled) {
          if (slug === 'waafi-cargo') {
            setProject(null);
            setError('Not found');
          } else {
            const local = fallbackProjects.find((p) => p.slug === slug) || null;
            setProject(local);
            setError(local ? null : err.message);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { project, loading, error };
}
