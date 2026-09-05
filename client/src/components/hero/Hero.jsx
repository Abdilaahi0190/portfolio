import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import Button from '../ui/Button';
import HeroVisual from './HeroVisual';
import { personal } from '../../data/personal';

const lineVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 lg:pt-28">
      <div className="container-site grid min-h-[calc(100vh-5rem)] items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
        <div className="relative z-10 max-w-2xl">
          <motion.p
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="caption mb-6 text-[var(--color-brand)]"
          >
            {personal.title}
          </motion.p>

          <motion.h1
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="display text-[var(--text)]"
          >
            Building digital experiences,
            <span className="mt-2 block text-[var(--text-secondary)]">
              from mobile interfaces to scalable systems.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--text-secondary)]"
          >
            Mobile-focused full-stack developer specializing in Flutter, modern web technologies,
            APIs, and databases — {personal.name.split(' ').slice(0, 2).join(' ')}.
          </motion.p>

          <motion.div
            custom={3}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button to="/work" size="lg">
              View my work
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </Button>
            <Button to="/about" variant="secondary" size="lg">
              About me
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              Contact
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--color-brand)]"
            >
              <Github size={16} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--color-brand)]"
            >
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-[var(--border)] sm:inline-block" />
            <span className="text-sm text-[var(--text-tertiary)]">{personal.location}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
