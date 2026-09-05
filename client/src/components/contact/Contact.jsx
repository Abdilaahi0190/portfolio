import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { personal } from '../../data/personal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.errors?.[0]?.msg || json.message || 'Something went wrong.');
      }
      setStatus({ type: 'success', message: json.message });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const fieldCls =
    'w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(22,119,255,0.15)]';

  return (
    <section id="contact" className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something great."
            subtitle="Have a project, collaboration, or opportunity? Send a message — open to meaningful mobile and full-stack work."
          />

          <div className="space-y-3">
            {[
              { href: `mailto:${personal.email}`, icon: Mail, label: personal.email },
              { href: personal.github, icon: Github, label: personal.githubUser, external: true },
              { href: personal.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="flex items-center gap-3 rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] px-4 py-3.5 text-sm text-[var(--text-secondary)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                <item.icon size={16} /> {item.label}
              </a>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[24px] border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow)] sm:p-8"
        >
          <div className="grid gap-5">
            <label className="block">
              <span className="caption mb-2 block">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className={fieldCls}
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="caption mb-2 block">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className={fieldCls}
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="caption mb-2 block">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={5}
                className={`${fieldCls} resize-y`}
                placeholder="Tell me about the project or idea..."
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={loading} size="lg">
              {loading ? 'Sending...' : 'Send message'} <Send size={15} />
            </Button>
            {status.message && (
              <p
                className={`text-sm ${
                  status.type === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
