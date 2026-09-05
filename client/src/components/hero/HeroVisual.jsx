import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import portrait from '../../assets/abdilaahi-portrait.png';
import { personal } from '../../data/personal';

export default function HeroVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 28]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative mx-auto w-full max-w-[480px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_40%_30%,var(--glow),transparent_65%)] opacity-80"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[28px] border border-[var(--border-secondary)] bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]"
      >
        <img
          src={portrait}
          alt={`${personal.name} — professional portrait`}
          className="aspect-[4/5] w-full object-cover object-[center_18%]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--bg)]/55 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
