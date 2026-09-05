import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const styles = {
  primary:
    'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] shadow-[0_2px_0_rgba(5,145,255,0.1)]',
  secondary:
    'bg-[var(--bg-elevated)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--fill)] hover:text-[var(--text)]',
  text: 'bg-transparent text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] px-0',
};

export default function Button({
  children,
  href,
  to,
  variant = 'primary',
  className = '',
  external = false,
  type = 'button',
  onClick,
  disabled,
  size = 'md',
}) {
  const sizeCls =
    size === 'sm' ? 'h-9 px-4 text-sm gap-1.5' : size === 'lg' ? 'h-12 px-7 text-base gap-2' : 'h-10 px-5 text-sm gap-2';

  const classes = `group inline-flex items-center justify-center rounded-lg font-semibold tracking-[-0.01em] transition-all duration-250 ${sizeCls} ${styles[variant]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  const motionProps = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.985 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
