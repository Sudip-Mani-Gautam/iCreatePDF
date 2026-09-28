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
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Inbox
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface ContactPageClientProps {
  locale: Locale;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'activation_needed' | 'error';

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const tCommon = useTranslations('common');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    visitor_subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us Directly',
      description: 'Send us an email anytime and our team will get back to you promptly.',
      action: 'icreatepdf7@gmail.com',
      href: 'mailto:icreatepdf7@gmail.com',
    },
    {
      icon: Github,
      title: 'GitHub Repository',
      description: 'Report issues, request new PDF tools, or contribute to open-source.',
      action: 'GitHub Discussions & Issues',
      href: 'https://github.com/Sudip-Mani-Gautam/iCreatePDF',
    },
    {
      icon: Twitter,
      title: 'Twitter / X',
      description: 'Follow our official announcements and feature updates.',
      action: '@icreatepdf',
      href: 'https://twitter.com/icreatepdf',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage(null);

    const formElement = e.currentTarget;
    const formDataPayload = new FormData(formElement);

    try {
      const response = await fetch('https://formsubmit.co/ajax/14debdd1796a77ccfc9188ea3aca9156', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataPayload,
      });

      const data = await response.json().catch(() => null);

      if (data && (data.success === 'true' || data.success === true)) {
        setFormStatus('success');
        setFormData({ name: '', email: '', visitor_subject: '', message: '' });
      } else if (data && data.message && (data.message.includes('Activation') || data.message.includes('Activate'))) {
        setFormStatus('activation_needed');
      } else {
        setErrorMessage(data?.message || 'Could not send message. Please try again.');
        setFormStatus('error');
      }
    } catch {
      setErrorMessage('Network error submitting form. Please check your connection or email us directly.');
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased selection:bg-red-500 selection:text-white">
      <Header locale={locale} />

      {/* Main Container */}
      <main className="flex-1 pt-20 sm:pt-22 md:pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-3 pb-8 text-center">
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
              Get in Touch with iCreatePDF
            </h1>
            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed">
              Have a question, feedback, or tool suggestion? Fill out the form below or reach us directly.
            </p>
          </div>
        </section>

        {/* Contact Content Section - 2-Column Professional Layout */}
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact Methods & FAQ (5 cols) */}
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
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] mb-4 leading-relaxed">
                      Find instant answers about private PDF tools, security, and offline browser processing on iCreatePDF.
                    </p>
                    <Link
                      href={`/${locale}/faq`}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] text-xs font-bold text-[hsl(var(--color-foreground))] transition-colors"
                    >
                      Visit FAQ
                    </Link>
                  </div>
                </div>
              </div>

              {/* Security & Anti-spam guarantee */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Protected by automated spam filtering. Your email is never shared.</span>
              </div>
            </div>

            {/* Right Column: Send us a Message Form (7 cols) */}
            <div className="lg:col-span-7">
              {/* SUCCESS STATE */}
              {formStatus === 'success' && (
                <div className="p-8 sm:p-10 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-2">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
                    Thank You for Contacting iCreatePDF!
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] max-w-md mx-auto leading-relaxed">
                    Your message has been sent successfully. We will review your inquiry and get back to you as soon as possible.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <Link
                      href={`/${locale}`}
                      className="px-5 py-2.5 rounded-full border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] text-xs font-bold text-[hsl(var(--color-foreground))] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Home className="w-3.5 h-3.5" /> Back to Home
                    </Link>
                  </div>
                </div>
              )}

              {/* ACTIVATION PENDING STATE */}
              {formStatus === 'activation_needed' && (
                <div className="p-8 sm:p-10 rounded-2xl bg-[hsl(var(--color-card))] border border-amber-200 dark:border-amber-900/50 shadow-xs text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mb-2">
                    <Inbox className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
                    One-Time Activation Required
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] max-w-md mx-auto leading-relaxed">
                    FormSubmit has sent a confirmation email to <strong className="text-[hsl(var(--color-foreground))]">icreatepdf7@gmail.com</strong>.
                  </p>
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 text-left space-y-2 max-w-md mx-auto">
                    <p className="font-semibold">👉 Next Steps to Activate:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open your inbox at <strong>icreatepdf7@gmail.com</strong>.</li>
                      <li>Click the green <strong>&ldquo;Activate Form&rdquo;</strong> button in the FormSubmit email.</li>
                      <li>That&apos;s it! All future messages will be delivered directly without any prompts.</li>
                    </ol>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      Back to Form
                    </button>
                  </div>
                </div>
              )}

              {/* DEFAULT FORM STATE */}
              {formStatus !== 'success' && formStatus !== 'activation_needed' && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] tracking-tight mb-2 flex items-center gap-2">
                      <span>Send Us a Message</span>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </h2>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      Fill out the form below. We read and respond to every message.
                    </p>
                  </div>

                  {/* FormSubmit Form */}
                  <form
                    action="https://formsubmit.co/14debdd1796a77ccfc9188ea3aca9156"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* _next: Thank-you page fallback */}
                    <input
                      type="hidden"
                      name="_next"
                      value="https://icreatepdf.com/thank-you/"
                    />

                    {/* _subject: Subject of the email received */}
                    <input
                      type="hidden"
                      name="_subject"
                      value="New iCreatePDF Contact Form Submission"
                    />

                    {/* _cc: Send a copy to second email address */}
                    <input
                      type="hidden"
                      name="_cc"
                      value="sudipmanigautam3@gmail.com"
                    />

                    {/* _blacklist: Block common spam phrases */}
                    <input
                      type="hidden"
                      name="_blacklist"
                      value="viagra,casino,free money,crypto scam"
                    />

                    {/* _captcha: Disable FormSubmit reCAPTCHA */}
                    <input
                      type="hidden"
                      name="_captcha"
                      value="false"
                    />

                    {/* _autoresponse: Automatic response sent to the visitor */}
                    <input
                      type="hidden"
                      name="_autoresponse"
                      value="Thank you for contacting iCreatePDF. We have received your message and will get back to you as soon as possible."
                    />

                    {/* _template: Use FormSubmit's table email template */}
                    <input
                      type="hidden"
                      name="_template"
                      value="table"
                    />

                    {/* FORM FIELDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          autoComplete="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                        />
                      </div>

                      {/* Email (_replyto) */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Your Email Address"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="visitor_subject"
                        placeholder="Subject"
                        required
                        value={formData.visitor_subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Write your message..."
                        rows={7}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-sm text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all resize-none"
                      ></textarea>
                    </div>

                    {formStatus === 'error' && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-400 text-xs">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <p>{errorMessage || 'There was a problem sending your message. Please try again or email us directly.'}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>
                        {formStatus === 'submitting' ? 'Sending Message...' : 'Send Message'}
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
