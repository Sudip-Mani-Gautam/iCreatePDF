'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Mail, MessageSquare, Github, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
      action: 'contact@icreatepdf.com',
      href: 'mailto:contact@icreatepdf.com',
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

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, always succeed
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[hsl(var(--color-muted)/0.3)] py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--color-foreground))] mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-[hsl(var(--color-muted-foreground))]">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content Section - 2-Column Professional Layout */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Direct Contact Methods & Quick FAQ Link (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="p-6" hover>
                        <div className="flex items-start gap-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--color-primary)/0.1)] flex-shrink-0">
                            <Icon className="h-6 w-6 text-[hsl(var(--color-primary))]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-1">
                              {method.title}
                            </h3>
                            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-3 leading-relaxed">
                              {method.description}
                            </p>
                            <span className="text-sm font-medium text-[hsl(var(--color-primary))] break-all">
                              {method.action}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </a>
                  );
                })}

                {/* FAQ Quick Link Card */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--color-muted))] flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-[hsl(var(--color-muted-foreground))]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-1">
                        {t('faq.title')}
                      </h3>
                      <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4 leading-relaxed">
                        {t('faq.description', { brand: tCommon('brand') || 'iCreatePDF' })}
                      </p>
                      <Link href={`/${locale}/faq`}>
                        <Button variant="outline" size="sm">
                          {t('faq.button')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Send us a Message Form (7 cols) */}
              <div className="lg:col-span-7">
                {formStatus === 'success' ? (
                  <Card className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))] mb-2">
                      {t('form.success.title')}
                    </h3>
                    <p className="text-[hsl(var(--color-muted-foreground))] mb-6">
                      {t('form.success.description')}
                    </p>
                    <Button variant="outline" onClick={() => setFormStatus('idle')}>
                      {t('form.success.button')}
                    </Button>
                  </Card>
                ) : (
                  <Card className="p-6 md:p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                        {t('form.title')}
                      </h2>
                      <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                        {t('form.description')}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
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
                            className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))]"
                            placeholder={t('form.fields.name.placeholder')}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
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
                            className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))]"
                            placeholder={t('form.fields.email.placeholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
                        >
                          {t('form.fields.subject.label')}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))]"
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
                          className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
                        >
                          {t('form.fields.message.label')}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] resize-none"
                          placeholder={t('form.fields.message.placeholder')}
                        />
                      </div>

                      {formStatus === 'error' && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                          <p className="text-sm">
                            {t('form.error')}
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        loading={formStatus === 'submitting'}
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? t('form.submit.loading') : t('form.submit.default')}
                        {formStatus !== 'submitting' && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
