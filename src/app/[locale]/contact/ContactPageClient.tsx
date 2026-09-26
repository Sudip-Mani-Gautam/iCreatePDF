'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  Mail, 
  MessageSquare, 
  Github, 
  Twitter, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Home,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';

interface ContactPageClientProps {
  locale: Locale;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const t = useTranslations('contactPage');
  const tCommon = useTranslations('common');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [submittedData, setSubmittedData] = useState<{ subject: string; message: string; name: string; email: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Mail,
      title: t('methods.email.title'),
      description: t('methods.email.description'),
      action: 'sudipmanigautam3@gmail.com',
      href: 'mailto:sudipmanigautam3@gmail.com',
    },
    {
      icon: Github,
      title: t('methods.github.title'),
      description: t('methods.github.description'),
      action: t('methods.github.action'),
      href: 'https://github.com/Sudip-Mani-Gautam/iCreatePDF',
    },
    {
      icon: Twitter,
      title: t('methods.twitter.title'),
      description: t('methods.twitter.description'),
      action: '@icreatepdf',
      href: 'https://twitter.com/icreatepdf',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const subjectText = formData.subject ? `[iCreatePDF Contact] ${formData.subject}` : '[iCreatePDF Contact] Inquiry';
      const bodyText = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:sudipmanigautam3@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

      // Save for fallback on success screen
      setSubmittedData({ ...formData });

      // Automatically launch mail client
      window.location.href = mailtoUrl;

      // Transition to success state
      setTimeout(() => {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 600);
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased selection:bg-red-500 selection:text-white">
      <Header locale={locale} />

      {/* Main Container with pt-16 top padding matching fixed h-16 header */}
      <main className="flex-1 pt-16 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-3 pb-8 text-center">
          {/* Subtle warm backdrop glow matching HomePage and FAQ */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-red-100/40 via-rose-50/20 to-transparent dark:from-red-950/20 dark:via-rose-950/10 blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-1.5 text-xs text-[hsl(var(--color-muted-foreground))]">
              <Link href={`/${locale}`} className="hover:text-[hsl(var(--color-foreground))] transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>{tCommon('navigation.home') || 'Home'}</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[hsl(var(--color-muted-foreground))/0.6]" />
              <span className="text-[hsl(var(--color-foreground))] font-medium">
                {tCommon('navigation.contact') || 'Contact Us'}
              </span>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </section>

        {/* Contact Content Section - 2-Column Professional Layout */}
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact Methods & FAQ Sidebar (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-red-300 dark:hover:border-red-900 shadow-xs hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-bold text-base text-[hsl(var(--color-foreground))] mb-1 group-hover:text-red-600 transition-colors">
                            {method.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] mb-3 leading-relaxed">
                            {method.description}
                          </p>
                          <span className="text-sm font-semibold text-red-600 dark:text-red-400 group-hover:underline break-all inline-flex items-center gap-1">
                            {method.action}
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}

              {/* FAQ Quick Link Card */}
              <div className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-[hsl(var(--color-foreground))] mb-1">
                      {t('faq.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] mb-4 leading-relaxed">
                      {t('faq.description', { brand: tCommon('brand') || 'iCreatePDF' })}
                    </p>
                    <Link
                      href={`/${locale}/faq`}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] text-xs font-bold text-[hsl(var(--color-foreground))] transition-colors"
                    >
                      {t('faq.button')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Send us a Message Form (7 cols) */}
            <div className="lg:col-span-7">
              {formStatus === 'success' ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-2">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
                    {t('form.success.title')}
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] max-w-md mx-auto leading-relaxed">
                    {t('form.success.description')}
                  </p>

                  {submittedData && (
                    <div className="p-4 rounded-xl bg-[hsl(var(--color-muted)/0.5)] border border-[hsl(var(--color-border))] text-left text-xs space-y-1.5 max-w-md mx-auto my-4 text-[hsl(var(--color-muted-foreground))]">
                      <div><strong className="text-[hsl(var(--color-foreground))]">To:</strong> sudipmanigautam3@gmail.com</div>
                      <div><strong className="text-[hsl(var(--color-foreground))]">From:</strong> {submittedData.name} ({submittedData.email})</div>
                      <div><strong className="text-[hsl(var(--color-foreground))]">Subject:</strong> {submittedData.subject || 'General Inquiry'}</div>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      {t('form.success.button')}
                    </button>
                    {submittedData && (
                      <a
                        href={`mailto:sudipmanigautam3@gmail.com?subject=${encodeURIComponent(`[iCreatePDF Contact] ${submittedData.subject}`)}&body=${encodeURIComponent(submittedData.message)}`}
                        className="px-5 py-2.5 rounded-full border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] text-xs font-bold text-[hsl(var(--color-foreground))] transition-colors inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" /> Open in Mail App
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-8 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] tracking-tight mb-2">
                      {t('form.title')}
                    </h2>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      {t('form.description')}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                        >
                          {t('form.fields.name.label')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                          placeholder={t('form.fields.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                        >
                          {t('form.fields.email.label')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                          placeholder={t('form.fields.email.placeholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                      >
                        {t('form.fields.subject.label')}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all cursor-pointer"
                      >
                        <option value="">{t('form.fields.subject.placeholder')}</option>
                        <option value="general">{t('form.fields.subject.options.general')}</option>
                        <option value="bug">{t('form.fields.subject.options.bug')}</option>
                        <option value="feature">{t('form.fields.subject.options.feature')}</option>
                        <option value="feedback">{t('form.fields.subject.options.feedback')}</option>
                        <option value="other">{t('form.fields.subject.options.other')}</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                      >
                        {t('form.fields.message.label')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all resize-none"
                        placeholder={t('form.fields.message.placeholder')}
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-400 text-xs">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <p>{t('form.error')}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>
                        {formStatus === 'submitting' ? t('form.submit.loading') : t('form.submit.default')}
                      </span>
                      {formStatus !== 'submitting' && <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
