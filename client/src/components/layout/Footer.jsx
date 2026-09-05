import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personal } from '../../data/personal';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-secondary)] bg-[var(--bg-elevated)]">
      <div className="container-site grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            {personal.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
            {personal.title}. Building mobile experiences and scalable software systems.
          </p>
        </div>

        <div>
          <p className="caption mb-4">Navigate</p>
          <div className="flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
            <Link to="/about" className="hover:text-[var(--color-brand)]">
              About
            </Link>
            <Link to="/work" className="hover:text-[var(--color-brand)]">
              Work
            </Link>
            <Link to="/skills" className="hover:text-[var(--color-brand)]">
              Skills
            </Link>
            <Link to="/contact" className="hover:text-[var(--color-brand)]">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="caption mb-4">Connect</p>
          <div className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[var(--color-brand)]"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[var(--color-brand)]"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 hover:text-[var(--color-brand)]"
            >
              <Mail size={15} /> {personal.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site border-t border-[var(--border-secondary)] py-6 text-xs text-[var(--text-tertiary)]">
        © {new Date().getFullYear()} {personal.name}
      </div>
    </footer>
  );
}
