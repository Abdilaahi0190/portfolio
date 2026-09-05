import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react';
import { personal } from '../../data/personal';
import { useTheme } from '../../context/ThemeContext';

const links = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/work', label: 'Work' },
  { to: '/about#journey', label: 'Journey', hash: true },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled || open ? 'glass shadow-[var(--shadow)]' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between lg:h-[72px]">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand)] text-sm font-bold text-white transition group-hover:bg-[var(--color-brand-hover)]">
            A
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            {personal.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => {
                const active =
                  isActive ||
                  (link.hash && location.pathname === '/about' && location.hash === '#journey');
                return `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'text-[var(--color-brand)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                }`;
              }}
            >
              {({ isActive }) => {
                const active =
                  isActive ||
                  (link.hash && location.pathname === '/about' && location.hash === '#journey');
                return (
                  <>
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[var(--color-brand)]"
                      />
                    )}
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-[var(--fill)] hover:text-[var(--text)] sm:inline-flex"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-[var(--fill)] hover:text-[var(--text)] sm:inline-flex"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-secondary)] text-[var(--text-secondary)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--border-secondary)] lg:hidden"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className="rounded-xl px-4 py-3 text-base font-medium text-[var(--text)] hover:bg-[var(--fill)]"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
