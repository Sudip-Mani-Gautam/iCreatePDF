'use client';

import React, { useMemo } from 'react';
import { Star, CheckCircle, Sparkles } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  country: 'np' | 'in' | 'cn' | 'us';
  flag: string;
  countryName: string;
  initials: string;
  color: string;
  toolUsed: string;
  rating: number;
}

interface TestimonialsSectionProps {
  locale: Locale;
}

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {

  const allTestimonials: TestimonialItem[] = useMemo(() => {
    if (locale === 'ne') {
      return [
        {
          id: 'np-1',
          quote: 'नेपालको कानुनी क्षेत्रमा अदालती कागजातहरू पूर्ण रूपमा अफलाइन र सुरक्षित राख्नु अत्यावश्यक हुन्छ। iCreatePDF ले कुनै पनि रिमोट सर्भरमा फाइल नपठाई सिधै ल्यापटपमा तत्काल काम गर्छ।',
          author: 'आरभ श्रेष्ठ (Aarav Shrestha)',
          role: 'वरिष्ठ कानुनी सल्लाहकार',
          location: 'काठमाडौं, नेपाल',
          country: 'np',
          flag: '🇳🇵',
          countryName: 'नेपाल',
          initials: 'AS',
          color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400',
          toolUsed: 'मर्ज र सुरक्षा PDF',
          rating: 5,
        },
        {
          id: 'np-2',
          quote: 'उच्च-रिजोल्युसन इन्जिनियरिङ CAD नक्साहरू कम्प्रेस गर्दा पहिले गुणस्तर घट्ने डर हुन्थ्यो। iCreatePDF मार्फत नक्साको स्पष्टता यथावत रहन्छ र साइज ७०% घट्छ।',
          author: 'पूजा अधिकारी (Pooja Adhikari)',
          role: 'सिभिल इन्जिनियरिङ योजनाकार',
          location: 'पोखरा, नेपाल',
          country: 'np',
          flag: '🇳🇵',
          countryName: 'नेपाल',
          initials: 'PA',
          color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
          toolUsed: 'कम्प्रेस र स्लाइस PDF',
          rating: 5,
        },
        {
          id: 'in-1',
          quote: 'जीएसटी अडिट र कर्पोरेट वित्तीय विवरणहरू ह्यान्डल गर्दा डेटा गोपनीयतामा सम्झौता गर्न सकिँदैन। शून्य सर्भर अपलोडले हामीलाई पूर्ण गोपनीयता प्रदान गर्छ।',
          author: 'राजेश शर्मा (Rajesh Sharma)',
          role: 'वरिष्ठ चार्टर्ड एकाउन्टेन्ट',
          location: 'बैंगलोर, भारत',
          country: 'in',
          flag: '🇮🇳',
          countryName: 'भारत',
          initials: 'RS',
          color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
          toolUsed: 'ब्याच इनभ्वाइस र OCR',
          rating: 5,
        },
        {
          id: 'in-2',
          quote: 'हाम्रो ४० सदस्यीय टोलीका लागि महँगो सफ्टवेयर सदस्यता हटायो। सम्झौताहरू वाटरमार्क गर्ने र ग्राहक स्टेटमेन्ट विभाजन गर्ने काम सेकेन्डमै हुन्छ।',
          author: 'अनन्या अय्यर (Ananya Iyer)',
          role: 'फिनटेक उत्पादन प्रबन्धक',
          location: 'मुम्बई, भारत',
          country: 'in',
          flag: '🇮🇳',
          countryName: 'भारत',
          initials: 'AI',
          color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400',
          toolUsed: 'वाटरमार्क र हस्ताक्षर',
          rating: 5,
        },
        {
          id: 'cn-1',
          quote: 'क्लाइन्ट-साइड WebAssembly कार्यान्वयन असाधारण छ। कुनै नेटवर्क ढिलाइ छैन, फाइल अपलोड सीमा छैन। यो हामीले प्रयोग गरेको सबैभन्दा सफा PDF टुल हो।',
          author: 'झाङ वेई (Wei Zhang)',
          role: 'इन्फ्रास्ट्रक्चर आर्किटेक्ट',
          location: 'शंघाई, चीन',
          country: 'cn',
          flag: '🇨🇳',
          countryName: 'चीन',
          initials: 'WZ',
          color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
          toolUsed: 'कार्यप्रवाह र मर्ज',
          rating: 5,
        },
        {
          id: 'cn-2',
          quote: 'हामी प्रत्येक हप्ता हजारौं ढुवानी लेबल र भन्सार इनभ्वाइसहरू ब्याच प्रशोधन गर्छौं। अफलाइन गतिले हाम्रो टोलीको हप्तामा १५ घण्टाभन्दा बढी समय बचत गर्छ।',
          author: 'लिन सियाओ (Lin Xiao)',
          role: 'ई-कमर्स सञ्चालन निर्देशक',
          location: 'शेन्जेन, चीन',
          country: 'cn',
          flag: '🇨🇳',
          countryName: 'चीन',
          initials: 'LX',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
          toolUsed: 'ब्याच कन्भर्टर र ZIP',
          rating: 5,
        },
        {
          id: 'us-1',
          quote: 'साइबर सुरक्षा अडिटरको रूपमा, म क्लाउडमा संवेदनशील फाइल अपलोड गर्न अनुमति दिन्न। iCreatePDF को ब्राउजर स्यान्डबक्सले फाइल कहिल्यै उपकरण बाहिर नजाने सुनिश्चित गर्छ।',
          author: 'Sarah Jenkins',
          role: 'मुख्य सुरक्षा अडिटर',
          location: 'सान फ्रान्सिस्को, अमेरिका',
          country: 'us',
          flag: '🇺🇸',
          countryName: 'संयुक्त राज्य अमेरिका',
          initials: 'SJ',
          color: 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400',
          toolUsed: 'रेडाक्ट र इन्क्रिप्ट PDF',
          rating: 5,
        },
        {
          id: 'us-2',
          quote: '१००% निजी, तत्काल गति र कुनै पुनरावर्ती सदस्यता शुल्क छैन। हाम्रो कानुनी विभागले संवेदनशील सम्झौताहरूका लागि दैनिक iCreatePDF प्रयोग गर्दछ।',
          author: 'Michael Davis',
          role: 'कर्पोरेट अनुपालन निर्देशक',
          location: 'अस्टिन, टेक्सास, अमेरिका',
          country: 'us',
          flag: '🇺🇸',
          countryName: 'संयुक्त राज्य अमेरिका',
          initials: 'MD',
          color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400',
          toolUsed: 'AES-256 लक र बेट्स नम्बरिङ',
          rating: 5,
        },
      ];
    } else if (locale === 'hi') {
      return [
        {
          id: 'in-1',
          quote: 'जीएसटी ऑडिट और कॉर्पोरेट वित्तीय लेजर को संभालते समय डेटा गोपनीयता सर्वोपरि है। शून्य सर्वर अपलोड हमें क्लाइंट गोपनीयता का 100% अनुपालन देता है।',
          author: 'राजेश शर्मा (Rajesh Sharma)',
          role: 'सीनियर चार्टर्ड एकाउंटेंट',
          location: 'बैंगलोर, भारत',
          country: 'in',
          flag: '🇮🇳',
          countryName: 'भारत',
          initials: 'RS',
          color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
          toolUsed: 'बैच इनवॉइस और OCR',
          rating: 5,
        },
        {
          id: 'in-2',
          quote: 'हमारी 40 सदस्यों की टीम के लिए महंगे सब्सक्रिप्शन खर्च को समाप्त कर दिया। अनुबंधों पर वॉटरमार्क लगाना और फाइलें स्प्लिट करना सेकंडों में होता है।',
          author: 'अनन्या अय्यर (Ananya Iyer)',
          role: 'फिनटेक प्रोडक्ट मैनेजर',
          location: 'मुंबई, भारत',
          country: 'in',
          flag: '🇮🇳',
          countryName: 'भारत',
          initials: 'AI',
          color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400',
          toolUsed: 'वॉटरमार्क और डिजिटल साइन',
          rating: 5,
        },
        {
          id: 'np-1',
          quote: 'कानूनी दस्तावेज़ों को पूरी तरह से ऑफ़लाइन और सुरक्षित रखना बहुत ज़रूरी है। iCreatePDF किसी भी दूरस्थ सर्वर पर फाइल अपलोड किए बिना सीधे लैपटॉप पर काम करता है।',
          author: 'आरव श्रेष्ठ (Aarav Shrestha)',
          role: 'वरिष्ठ कानूनी सलाहकार',
          location: 'काठमांडू, नेपाल',
          country: 'np',
          flag: '🇳🇵',
          countryName: 'नेपाल',
          initials: 'AS',
          color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400',
          toolUsed: 'मर्ज और सुरक्षा PDF',
          rating: 5,
        },
        {
          id: 'np-2',
          quote: 'हाई-रिज़ॉल्यूशन इंजीनियरिंग सीएडी ड्रॉइंग को कंप्रेस करते समय वेक्टर स्पष्टता बनी रहती है और फाइल का आकार 70% तक कम हो जाता है।',
          author: 'पूजा अधिकारी (Pooja Adhikari)',
          role: 'सिविल इंजीनियरिंग प्लानर',
          location: 'पोखरा, नेपाल',
          country: 'np',
          flag: '🇳🇵',
          countryName: 'नेपाल',
          initials: 'PA',
          color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
          toolUsed: 'कंप्रेस और लेजर स्लाइस',
          rating: 5,
        },
        {
          id: 'cn-1',
          quote: 'क्लाइंट-साइड WebAssembly तकनीक बेहद तेज है। कोई नेटवर्क विलंब नहीं, कोई अपलोड सीमा नहीं। यह हमारे द्वारा तैनात किया गया सबसे सुरक्षित टूल है।',
          author: 'झांग वेई (Wei Zhang)',
          role: 'इन्फ्रास्ट्रक्चर आर्किटेक्ट',
          location: 'शंघाई, चीन',
          country: 'cn',
          flag: '🇨🇳',
          countryName: 'चीन',
          initials: 'WZ',
          color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
          toolUsed: 'वर्कफ़्लो और मर्ज',
          rating: 5,
        },
        {
          id: 'cn-2',
          quote: 'हम हर हफ्ते हजारों शिपिंग लेबल और सीमा शुल्क इनवॉइस को बैच प्रोसेस करते हैं। ऑफ़लाइन गति से हमारे हर हफ्ते 15 घंटे बचते हैं।',
          author: 'लिन शियाओ (Lin Xiao)',
          role: 'ई-कॉमर्स संचालन निदेशक',
          location: 'शेन्ज़ेन, चीन',
          country: 'cn',
          flag: '🇨🇳',
          countryName: 'चीन',
          initials: 'LX',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
          toolUsed: 'बैच कन्वर्टर और ZIP',
          rating: 5,
        },
        {
          id: 'us-1',
          quote: 'एक सुरक्षा ऑडिटर के रूप में, मैं अनरेडैक्टेड फाइलों को क्लाउड पर अपलोड करने की अनुमति नहीं देता। iCreatePDF फाइलों को स्थानीय रैम में सुरक्षित रखता है।',
          author: 'Sarah Jenkins',
          role: 'मुख्य सुरक्षा लेखा परीक्षक',
          location: 'सैन फ्रांसिस्को, अमेरिका',
          country: 'us',
          flag: '🇺🇸',
          countryName: 'संयुक्त राज्य अमेरिका',
          initials: 'SJ',
          color: 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400',
          toolUsed: 'रेडैक्ट और एन्क्रिप्ट',
          rating: 5,
        },
        {
          id: 'us-2',
          quote: '100% निजी, तुरंत गति और कोई आवर्ती सदस्यता नहीं। हमारा कानूनी विभाग गोपनीय कागजात के लिए प्रतिदिन iCreatePDF का उपयोग करता है।',
          author: 'Michael Davis',
          role: 'कॉर्पोरेट अनुपालन अधिकारी',
          location: 'ऑस्टिन, टेक्सास, अमेरिका',
          country: 'us',
          flag: '🇺🇸',
          countryName: 'संयुक्त राज्य अमेरिका',
          initials: 'MD',
          color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400',
          toolUsed: 'AES-256 लॉक और बेट्स',
          rating: 5,
        },
      ];
    }

    // Default English & International
    return [
      {
        id: 'in-1',
        quote: "Handling GST audits and corporate financial ledgers requires uncompromising privacy. Zero server upload gives our accounting firm 100% compliance with client confidentiality regulations.",
        author: 'Rajesh Sharma',
        role: 'Senior Chartered Accountant & Partner',
        location: 'Bangalore, India',
        country: 'in',
        flag: '🇮🇳',
        countryName: 'India',
        initials: 'RS',
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
        toolUsed: 'Batch Invoice & OCR',
        rating: 5,
      },
      {
        id: 'np-1',
        quote: "In Nepal's legal sector, keeping court files strictly offline and secure is crucial. iCreatePDF processes large legal briefs in milliseconds directly on my laptop without uploading to any remote servers.",
        author: 'Aarav Shrestha',
        role: 'Senior Legal Consultant',
        location: 'Kathmandu, Nepal',
        country: 'np',
        flag: '🇳🇵',
        countryName: 'Nepal',
        initials: 'AS',
        color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400',
        toolUsed: 'Merge & Password Protect',
        rating: 5,
      },
      {
        id: 'cn-1',
        quote: "The client-side WebAssembly execution is breathtaking. No network lag, no file upload quotas, and no data leaving our intranet. It is by far the cleanest PDF suite we have ever deployed.",
        author: 'Wei Zhang (张伟)',
        role: 'Enterprise Infrastructure Architect',
        location: 'Shanghai, China',
        country: 'cn',
        flag: '🇨🇳',
        countryName: 'China',
        initials: 'WZ',
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
        toolUsed: 'Visual Workflow & Merge',
        rating: 5,
      },
      {
        id: 'us-1',
        quote: "As a cybersecurity assessor, I strictly forbid cloud uploads of unredacted forensic logs. iCreatePDF’s in-browser sandbox ensures confidential records never leave local device RAM.",
        author: 'Sarah Jenkins',
        role: 'Chief Security Auditor',
        location: 'San Francisco, CA, USA',
        country: 'us',
        flag: '🇺🇸',
        countryName: 'United States',
        initials: 'SJ',
        color: 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400',
        toolUsed: 'Redact & Encrypt PDF',
        rating: 5,
      },
      {
        id: 'in-2',
        quote: "We replaced expensive recurring subscriptions across our entire 40-person squad. Watermarking contracts and splitting client statements happens in seconds right in the browser.",
        author: 'Ananya Iyer',
        role: 'FinTech Product Lead',
        location: 'Mumbai, India',
        country: 'in',
        flag: '🇮🇳',
        countryName: 'India',
        initials: 'AI',
        color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400',
        toolUsed: 'Watermark & Digital Sign',
        rating: 5,
      },
      {
        id: 'np-2',
        quote: "Compressing high-resolution CAD architectural drawings used to degrade vector quality. With iCreatePDF, the blueprints stay razor-sharp and shrink by 70% offline.",
        author: 'Pooja Adhikari',
        role: 'Civil Engineering Planner',
        location: 'Pokhara, Nepal',
        country: 'np',
        flag: '🇳🇵',
        countryName: 'Nepal',
        initials: 'PA',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
        toolUsed: 'Compress & Laser Slice',
        rating: 5,
      },
      {
        id: 'cn-2',
        quote: "We batch process thousands of shipping labels and supplier customs invoices every week. The offline speed and batch export capabilities saved our logistics team over 15 hours a week.",
        author: 'Lin Xiao (肖林)',
        role: 'Cross-Border Operations Director',
        location: 'Shenzhen, China',
        country: 'cn',
        flag: '🇨🇳',
        countryName: 'China',
        initials: 'LX',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
        toolUsed: 'Batch Converter & ZIP',
        rating: 5,
      },
      {
        id: 'us-2',
        quote: "100% private, instant execution, and zero subscription paywalls. Our legal and compliance department uses iCreatePDF daily for sensitive M&A disclosures.",
        author: 'Michael Davis',
        role: 'Corporate Compliance Officer',
        location: 'Austin, TX, USA',
        country: 'us',
        flag: '🇺🇸',
        countryName: 'United States',
        initials: 'MD',
        color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400',
        toolUsed: 'AES-256 Lock & Bates Stamp',
        rating: 5,
      },
    ];
  }, [locale]);

  return (
    <section
      suppressHydrationWarning
      aria-label="User Reviews and Testimonials"
      className="py-16 sm:py-24 bg-[hsl(var(--color-muted)/0.45)] border-y border-[hsl(var(--color-border))] relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-red-500/5 via-amber-500/5 to-purple-500/5 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Header Block with Rating Score & Global Presence */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Trust Score Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-4 shadow-xs">
            <div className="flex gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold">4.9 / 5</span>
            <span className="text-[hsl(var(--color-muted-foreground))]">•</span>
            <span>
              {locale === 'ne'
                ? '१५०+ देशका १,२०,०००+ प्रयोगकर्ताहरूद्वारा विश्वास गरिएको'
                : locale === 'hi'
                ? '150+ देशों में 1,20,000+ पेशेवरों द्वारा विश्वसनीय'
                : 'Trusted by 140,000+ professionals across 150+ countries'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight mb-3">
            {locale === 'ne'
              ? 'विश्वभरका लाखौं प्रयोगकर्ताहरूको रोजाइ'
              : locale === 'hi'
              ? 'दुनिया भर के लाखों उपयोगकर्ताओं द्वारा पसंदीदा'
              : 'Loved by Millions Worldwide'}
          </h2>

          <p className="text-sm sm:text-base text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed">
            {locale === 'ne'
              ? 'नेपाल, भारत, चीन, अमेरिका लगायत विश्वभरका कानूनी, लेखा र इन्जिनियरिङ पेशेवरहरूले किन iCreatePDF रोज्छन् हेर्नुहोस्।'
              : locale === 'hi'
              ? 'देखें कि भारत, नेपाल, चीन और अमेरिका में कानूनी, वित्तीय और तकनीकी पेशेवर 100% सुरक्षित ऑफ़लाइन पीडीएफ के लिए iCreatePDF को क्यों चुनते हैं।'
              : 'See why legal teams, chartered accountants, and engineers across India, Nepal, China, and the United States choose iCreatePDF for 100% private offline editing.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {allTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-red-400/50 dark:hover:border-red-700/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Stars + Country Flag & Location Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))] border border-[hsl(var(--color-border))]">
                    <span>{item.flag}</span>
                    <span className="truncate max-w-[120px]">{item.location}</span>
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-[13px] text-[hsl(var(--color-foreground))] leading-relaxed italic mb-5">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Metadata: Tool Used Badge + Author */}
              <div className="pt-3.5 border-t border-[hsl(var(--color-border))]">
                {/* Tool Tag */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-[hsl(var(--color-muted)/0.8)] text-zinc-600 dark:text-zinc-300">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                    <span className="truncate">{item.toolUsed}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[hsl(var(--color-foreground))] leading-tight flex items-center gap-1 truncate">
                      <span className="truncate">{item.author}</span>
                      <CheckCircle className="w-3 h-3 text-emerald-500 fill-emerald-500/20 flex-shrink-0" />
                    </div>
                    <div className="text-[11px] text-[hsl(var(--color-muted-foreground))] truncate">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
