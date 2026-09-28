'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GitFork,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Lock,
  Zap,
  ShieldCheck,
  FileText,
  Layers,
  Droplets,
  FolderArchive,
  Download,
  Sliders,
  Check,
  ExternalLink,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';

interface WorkflowShowcaseProps {
  locale: Locale;
}

interface PipelineStep {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgClass: string;
  tag: string;
}

interface WorkflowPreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  steps: PipelineStep[];
  executionTime: string;
  privacyNotice: string;
}

const PRESETS: WorkflowPreset[] = [
  {
    id: 'contract-vault',
    title: 'Secure Contract Publishing',
    badge: 'Security & Legal',
    description: 'Protect sensitive agreements with custom confidential watermarks, high compression, and AES-256 password encryption in one pass.',
    executionTime: '0.38s locally',
    privacyNotice: 'Zero server upload • 100% Client-Side',
    steps: [
      {
        id: 'input',
        name: 'Contract Input',
        category: 'Input Node',
        description: 'Upload legal PDF',
        icon: FileText,
        color: 'text-blue-500',
        bgClass: 'bg-blue-500/10 border-blue-500/30',
        tag: 'PDF • 12MB',
      },
      {
        id: 'watermark',
        name: 'Confidential Stamp',
        category: 'Edit & Annotate',
        description: '45° opacity watermark',
        icon: Droplets,
        color: 'text-purple-500',
        bgClass: 'bg-purple-500/10 border-purple-500/30',
        tag: '"CONFIDENTIAL"',
      },
      {
        id: 'compress',
        name: 'Lossless Compress',
        category: 'Optimize',
        description: 'Shrink size by 65%',
        icon: Zap,
        color: 'text-emerald-500',
        bgClass: 'bg-emerald-500/10 border-emerald-500/30',
        tag: 'High (-65%)',
      },
      {
        id: 'encrypt',
        name: 'AES-256 Lock',
        category: 'Security',
        description: 'Apply user password',
        icon: Lock,
        color: 'text-rose-500',
        bgClass: 'bg-rose-500/10 border-rose-500/30',
        tag: 'Encrypted',
      },
      {
        id: 'output',
        name: 'Secure Export',
        category: 'Output Node',
        description: 'Instant local save',
        icon: Download,
        color: 'text-amber-500',
        bgClass: 'bg-amber-500/10 border-amber-500/30',
        tag: 'Protected PDF',
      },
    ],
  },
  {
    id: 'ocr-archive',
    title: 'Invoice Batch OCR & Archive',
    badge: 'Finance & Archiving',
    description: 'Split multi-page invoice bundles, recognize scanned text with in-browser OCR, and pack optimized searchables into an organized ZIP archive.',
    executionTime: '0.62s locally',
    privacyNotice: 'Zero server upload • 100% Client-Side',
    steps: [
      {
        id: 'input-ocr',
        name: 'Scanned Invoices',
        category: 'Input Node',
        description: 'Batch scanned PDFs',
        icon: FolderArchive,
        color: 'text-amber-500',
        bgClass: 'bg-amber-500/10 border-amber-500/30',
        tag: '5 Files',
      },
      {
        id: 'split',
        name: 'Split by Document',
        category: 'Organize',
        description: 'Extract individual bills',
        icon: Layers,
        color: 'text-rose-500',
        bgClass: 'bg-rose-500/10 border-rose-500/30',
        tag: 'Auto-Split',
      },
      {
        id: 'ocr',
        name: 'Wasm OCR Engine',
        category: 'AI & Advanced',
        description: 'Extract text layer',
        icon: Sparkles,
        color: 'text-purple-500',
        bgClass: 'bg-purple-500/10 border-purple-500/30',
        tag: 'Searchable PDF',
      },
      {
        id: 'compress-ocr',
        name: 'Archive Clean',
        category: 'Optimize',
        description: 'Preserve clear fonts',
        icon: Zap,
        color: 'text-emerald-500',
        bgClass: 'bg-emerald-500/10 border-emerald-500/30',
        tag: 'DPI Balanced',
      },
      {
        id: 'zip',
        name: 'Download ZIP',
        category: 'Output Node',
        description: 'Bundled archive pack',
        icon: Download,
        color: 'text-blue-500',
        bgClass: 'bg-blue-500/10 border-blue-500/30',
        tag: 'Ready (.zip)',
      },
    ],
  },
  {
    id: 'dossier-merge',
    title: 'Executive Dossier Compilation',
    badge: 'Publishing & Admin',
    description: 'Merge multi-source reports, inject continuous Bates page numbering, and compile a polished final publication ready for distribution.',
    executionTime: '0.29s locally',
    privacyNotice: 'Zero server upload • 100% Client-Side',
    steps: [
      {
        id: 'input-merge',
        name: 'Multi-File Stack',
        category: 'Input Node',
        description: 'Annual reports & deck',
        icon: FileText,
        color: 'text-blue-500',
        bgClass: 'bg-blue-500/10 border-blue-500/30',
        tag: '3 Documents',
      },
      {
        id: 'merge',
        name: 'Merge & Reorder',
        category: 'Organize',
        description: 'Combine sequentially',
        icon: Layers,
        color: 'text-orange-500',
        bgClass: 'bg-orange-500/10 border-orange-500/30',
        tag: 'Linear Stitch',
      },
      {
        id: 'pagenum',
        name: 'Bates Numbering',
        category: 'Edit & Annotate',
        description: 'Footer pagination index',
        icon: Sliders,
        color: 'text-purple-500',
        bgClass: 'bg-purple-500/10 border-purple-500/30',
        tag: 'Page X of Y',
      },
      {
        id: 'seal',
        name: 'Integrity Check',
        category: 'Security',
        description: 'Sanitize metadata',
        icon: ShieldCheck,
        color: 'text-emerald-500',
        bgClass: 'bg-emerald-500/10 border-emerald-500/30',
        tag: 'Sanitized',
      },
      {
        id: 'out-dossier',
        name: 'Final Dossier',
        category: 'Output Node',
        description: 'Publication PDF',
        icon: Download,
        color: 'text-rose-500',
        bgClass: 'bg-rose-500/10 border-rose-500/30',
        tag: 'Compiled PDF',
      },
    ],
  },
];

export function WorkflowShowcase({ locale }: WorkflowShowcaseProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('contract-vault');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  // Handle Preset switch
  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    setIsSimulating(false);
    setActiveStepIndex(-1);
    setIsCompleted(false);
  };

  // Run the interactive step-by-step simulation
  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setIsCompleted(false);
    setActiveStepIndex(0);
  };

  // Advance simulation step by step
  useEffect(() => {
    if (!isSimulating) return;

    if (activeStepIndex < currentPreset.steps.length) {
      const timer = setTimeout(() => {
        setActiveStepIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // Completed all steps
      setIsSimulating(false);
      setIsCompleted(true);
    }
  }, [isSimulating, activeStepIndex, currentPreset.steps.length]);

  // Localized texts with fallbacks
  const t = {
    badge: locale === 'ne' ? 'नयाँ: भिजुअल वर्कफ्लो बिल्डर' : locale === 'hi' ? 'नया: विज़ुअल वर्कफ़्लो बिल्डर' : locale === 'es' ? 'NUEVO: GENERADOR DE FLUJOS' : locale === 'zh' ? '新功能：可视化工作流引擎' : 'NEXT-GEN AUTOMATION',
    titleMain: locale === 'ne' ? 'कागजात कार्यहरू स्वचालित गर्नुहोस्' : locale === 'hi' ? 'दस्तावेज़ कार्यों को स्वचालित करें' : locale === 'es' ? 'Automatice sus tareas de PDF' : locale === 'zh' ? '全自动多步骤文档处理管线' : 'Chain Multiple Tools.',
    titleHighlight: locale === 'ne' ? 'भिजुअल वर्कफ्लो पाइपलाइन मार्फत' : locale === 'hi' ? 'विज़ुअल पाइपलाइन के साथ' : locale === 'es' ? 'Con flujos de trabajo visuales' : locale === 'zh' ? '零代码拖拽式自由拼接' : 'Process in Seconds.',
    description: locale === 'ne'
      ? 'उपकरणहरू एकसाथ जोड्नुहोस् र जटिल कार्यहरू एकै क्लिकमा सम्पन्न गर्नुहोस्। शून्य अपलोड, १००% तपाईंको ब्राउजरमै स्थानीय प्रशोधन।'
      : locale === 'hi'
        ? 'टूल्स को आपस में जोड़ें और जटिल कार्यों को एक क्लिक में पूरा करें। कोई अपलोड नहीं, 100% आपके ब्राउज़र में सुरक्षित।'
        : locale === 'es'
          ? 'Conecte herramientas para automatizar tareas repetitivas en un solo clic. Cero cargas a servidores, 100% privado en su navegador.'
          : locale === 'zh'
            ? '自由拖拽拼接合并、压缩、加水印、加密等数十种工具。一次点击自动流转执行，文件零上传，全程本地内存沙箱处理。'
            : 'Connect 50+ tools into automated visual pipelines. Merge, redact, compress, and encrypt in a single click — 100% private in your browser.',
    btnLaunch: locale === 'ne' ? 'वर्कफ्लो स्टुडियो खोल्नुहोस्' : locale === 'hi' ? 'वर्कफ़्लो स्टूडियो खोलें' : locale === 'es' ? 'Abrir generador de flujos' : locale === 'zh' ? '立即进入工作流工作室' : 'Open Workflow Builder',
    btnSimulate: locale === 'ne' ? 'पाइपलाइन सिमुलेशन चलाउनुहोस्' : locale === 'hi' ? 'पाइपलाइन सिमुलेशन चलाएं' : locale === 'es' ? 'Simular flujo de trabajo' : locale === 'zh' ? '运行模拟演示' : 'Simulate Pipeline',
    btnReset: locale === 'ne' ? 'रिसेट' : locale === 'hi' ? 'रीसेट' : locale === 'es' ? 'Reiniciar' : locale === 'zh' ? '重置' : 'Reset Flow',
    statusSimulating: locale === 'ne' ? 'पाइपलाइन चल्दैछ...' : locale === 'hi' ? 'पाइपलाइन चल रही है...' : locale === 'es' ? 'Ejecutando tubería...' : locale === 'zh' ? '正在执行节点流水线...' : 'Simulating Local Execution...',
    statusDone: locale === 'ne' ? 'प्रशोधन सम्पन्न! (०.४ सेकेन्ड, शून्य अपलोड)' : locale === 'hi' ? 'प्रक्रिया पूरी हुई! (0.4s, 0 बाइट्स अपलोड)' : locale === 'es' ? '¡Flujo completado con éxito!' : locale === 'zh' ? '流水线本地执行完毕！0字节上传' : 'Pipeline Completed Locally • 0 bytes uploaded',
    feature1Title: locale === 'ne' ? 'भिजुअल नोड क्यानभास' : locale === 'hi' ? 'विज़ुअल नोड कैनवास' : locale === 'es' ? 'Lienzo de nodos visual' : locale === 'zh' ? '自由画布拖拽连线' : 'Visual Drag-and-Drop Canvas',
    feature1Desc: locale === 'ne' ? 'कुनै कोड बिना नोडहरू जोड्नुहोस् र आफ्नो अनुकूल कार्यप्रवाह सिर्जना गर्नुहोस्।' : locale === 'hi' ? 'बिना कोड के नोड्स कनेक्ट करें और अपने कस्टम वर्कफ़्लो बनाएं।' : locale === 'es' ? 'Conecte nodos visualmente sin código para crear flujos personalizados.' : locale === 'zh' ? '无需任何编程基础，直观拖入输入节点与工具节点即可无缝串联。' : 'Freely chain inputs, transformations, filters, and outputs on an infinite interactive canvas.',
    feature2Title: locale === 'ne' ? '१००% निजी र स्थानीय' : locale === 'hi' ? '100% निजी और स्थानीय' : locale === 'es' ? '100% privado y local' : locale === 'zh' ? '全本地 WebAssembly 引擎' : '100% Private Client-Side',
    feature2Desc: locale === 'ne' ? 'सबै चरणहरू ब्राउजरको WebAssembly भित्र चल्छन्। फाइलहरू कहिल्यै सर्भरमा जाँदैनन्।' : locale === 'hi' ? 'सभी चरण ब्राउज़र में चलते हैं। संवेदनशील फाइलें कभी बाहर नहीं जाती हैं।' : locale === 'es' ? 'Todo se procesa en el navegador. Sus archivos nunca se suben a la nube.' : locale === 'zh' ? '所有文件在本地浏览器沙箱与多线程 Web Worker 中执行，隐私绝对安全。' : 'All pipeline stages execute inside your local browser sandbox. Zero bytes uploaded to the cloud.',
    feature3Title: locale === 'ne' ? 'ब्याच र पुन: प्रयोगयोग्य' : locale === 'hi' ? 'बैच और दोबारा इस्तेमाल योग्य' : locale === 'es' ? 'Automatización por lotes' : locale === 'zh' ? '预设模板与 JSON 导入导出' : 'Batch Ready & Exportable',
    feature3Desc: locale === 'ne' ? 'पाइपलाइनहरू सेभ गर्नुहोस् वा JSON का रूपमा डाउनलोड गरेर जुनसुकै बेला प्रयोग गर्नुहोस्।' : locale === 'hi' ? 'पाइपलाइन सेव करें या JSON के रूप में डाउनलोड करके दोबारा चलाएं।' : locale === 'es' ? 'Guarde flujos de trabajo como plantillas o expórtelos en JSON para reutilizarlos.' : locale === 'zh' ? '随心保存自定义工作流，一键导出为 JSON 配置，支持多文件并发批处理。' : 'Save your favorite pipelines, export JSON presets, and run multi-file batch jobs in parallel.',
  };

  return (
    <section
      aria-label="Workflow Automation Studio"
      className="relative py-16 sm:py-24 overflow-hidden border-y border-zinc-200 dark:border-zinc-800 bg-[#f4f4f7] dark:bg-zinc-900/85"
    >
      {/* Background ambient decorative glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-rose-500/5 blur-2xl -z-10 pointer-events-none rounded-full" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 mb-3 shadow-xs">
            <GitFork className="w-3.5 h-3.5 text-red-600 dark:text-red-400 rotate-90" />
            <span className="tracking-wide uppercase">{t.badge}</span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight mb-3 sm:mb-4">
            {t.titleMain}{' '}
            <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-6">
            {t.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/workflow`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all group"
            >
              <span>{t.btnLaunch}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={isCompleted ? () => { setIsCompleted(false); setActiveStepIndex(-1); } : runSimulation}
              disabled={isSimulating}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border cursor-pointer ${
                isSimulating
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 animate-pulse'
                  : isCompleted
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50'
                  : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 hover:border-red-500 shadow-xs'
              }`}
            >
              {isSimulating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span>{t.statusSimulating}</span>
                </>
              ) : isCompleted ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{t.btnReset}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span>{t.btnSimulate}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex items-center justify-center mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300/80 dark:border-zinc-700/80 gap-1 shadow-inner">
            {PRESETS.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 shadow-sm border border-zinc-200 dark:border-zinc-700 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/50'
                  }`}
                >
                  <span className="hidden sm:inline opacity-70 mr-1.5 font-normal">[{preset.badge}]</span>
                  <span>{preset.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Visual Canvas Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md p-5 sm:p-8 mb-10 overflow-hidden">
          {/* Subtle Grid Canvas Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top Canvas Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              <div className="text-xs font-semibold text-[hsl(var(--color-foreground))] flex items-center gap-2">
                <span>{currentPreset.title}</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {currentPreset.privacyNotice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Est: {currentPreset.executionTime}</span>
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Link
                href={`/${locale}/workflow`}
                className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open in Studio</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Connected Pipeline Flow Nodes */}
          <div className="relative z-10 overflow-x-auto pb-4 pt-2">
            <div className="min-w-[760px] flex items-center justify-between gap-2 sm:gap-3 px-2">
              {currentPreset.steps.map((step, idx) => {
                const IconComponent = step.icon;
                const isStepActive = isSimulating && activeStepIndex === idx;
                const isStepPassed = (isSimulating && activeStepIndex > idx) || isCompleted;

                return (
                  <React.Fragment key={step.id}>
                    {/* Node Card */}
                    <div
                      className={`relative flex-1 p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border transition-all duration-300 min-w-[145px] max-w-[210px] ${
                        isStepActive
                          ? 'border-red-500 shadow-lg shadow-red-500/20 scale-105 -translate-y-1'
                          : isStepPassed
                          ? 'border-emerald-500/60 dark:border-emerald-500/40 shadow-xs'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-xs'
                      }`}
                    >
                      {/* Step Indicator Header */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Step {idx + 1}
                        </span>

                        {isStepPassed ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : isStepActive ? (
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        ) : (
                          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                            0{idx + 1}
                          </span>
                        )}
                      </div>

                      {/* Icon & Label */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${step.bgClass} ${step.color} transition-transform ${
                            isStepActive ? 'scale-110' : ''
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                            {step.name}
                          </h4>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                            {step.category}
                          </span>
                        </div>
                      </div>

                      {/* Description & Tag */}
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mb-2 line-clamp-1">
                        {step.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px]">
                        <span className="font-mono px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 truncate max-w-[110px]">
                          {step.tag}
                        </span>
                        {isStepPassed && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[9px]">
                            OK
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Connector Arrow & Pulse Line between nodes */}
                    {idx < currentPreset.steps.length - 1 && (
                      <div className="flex items-center justify-center flex-shrink-0 px-0.5 sm:px-1 relative">
                        <div
                          className={`h-0.5 w-6 sm:w-8 rounded-full transition-colors duration-300 ${
                            (isSimulating && activeStepIndex > idx) || isCompleted
                              ? 'bg-emerald-500'
                              : isSimulating && activeStepIndex === idx
                              ? 'bg-gradient-to-r from-red-500 to-rose-400 animate-pulse'
                              : 'bg-zinc-300 dark:bg-zinc-700'
                          }`}
                        />
                        <div
                          className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isSimulating && activeStepIndex === idx
                              ? 'bg-red-500 scale-125 translate-x-1 shadow-sm'
                              : isStepPassed
                              ? 'bg-emerald-500'
                              : 'bg-zinc-300 dark:bg-zinc-700'
                          }`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Completion Status Notification Banner */}
          {isCompleted && (
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-500/5 -mx-5 -mb-5 sm:-mx-8 sm:-mb-8 p-4 sm:p-5 rounded-b-2xl sm:rounded-b-3xl">
              <div className="flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t.statusDone}</span>
              </div>
              <Link
                href={`/${locale}/workflow`}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                <span>Build Yours in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Feature Pillars: Why Use Workflows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-red-400/50 dark:hover:border-red-700/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 border border-red-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {t.feature1Title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t.feature1Desc}
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-400/50 dark:hover:border-emerald-700/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {t.feature2Title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t.feature2Desc}
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-blue-400/50 dark:hover:border-blue-700/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {t.feature3Title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkflowShowcase;
