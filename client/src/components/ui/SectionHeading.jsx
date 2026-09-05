import { Reveal } from './Motion';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <Reveal className={`mb-12 flex max-w-3xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <span className="caption text-[var(--color-brand)]">{eyebrow}</span>}
      <h2 className="h2 text-[var(--text)]">{title}</h2>
      {subtitle && <p className="body max-w-2xl text-[17px]">{subtitle}</p>}
    </Reveal>
  );
}
