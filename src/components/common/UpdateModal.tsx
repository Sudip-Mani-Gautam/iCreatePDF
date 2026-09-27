'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { marked } from 'marked';
import {
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Package,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Calendar,
  ArrowRight,
  Monitor,
  Apple,
  FileCode2,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { UpdateCheckResult, ReleaseAsset } from '@/types/updater';
import { ignoreVersion, GITHUB_REPO } from '@/lib/updater';
import { openExternalUrl } from '@/lib/tauri-bridge';

export interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: UpdateCheckResult | null;
  loading: boolean;
  onRetry: () => void;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  result,
  loading,
  onRetry,
}) => {
  const t = useTranslations('common');
  const [showAllAssets, setShowAllAssets] = useState(false);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<{
    status: 'opening' | 'success' | 'failed';
    text: string;
  } | null>(null);

  const getMsg = (
    key: string,
    fallback: string,
    values?: Record<string, string | number>
  ): string => {
    try {
      const fullKey = `updater.${key}`;
      const msg = t(fullKey as any, values as any);
      if (
        msg &&
        !msg.startsWith('common.') &&
        !msg.startsWith('updater.') &&
        !msg.includes(`.${key}`) &&
        msg !== fullKey &&
        msg !== key
      ) {
        return msg;
      }
    } catch {
      // fallback
    }
    if (values) {
      let res = fallback;
      for (const [k, v] of Object.entries(values)) {
        res = res.replace(`{${k}}`, String(v));
      }
      return res;
    }
    return fallback;
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const cleanAssetName = (name: string): string => {
    if (!name) return '';
    return name
      .replace(/PDFCraft/gi, 'iCreatePDF')
      .replace(/pdfcraft/gi, 'icreatepdf');
  };

  const getAssetLabel = (asset: ReleaseAsset): string => {
    switch (asset.platformType) {
      case 'windows-portable':
        return 'Windows Portable (ZIP)';
      case 'windows-installer':
        return 'Windows Installer (.exe / .msi)';
      case 'macos-dmg':
        return 'macOS Apple Silicon (.dmg)';
      case 'linux-appimage':
        return 'Linux AppImage (Portable)';
      case 'linux-deb':
        return 'Linux Debian (.deb)';
      default:
        return cleanAssetName(asset.name);
    }
  };

  const getPlatformIcon = (platformType: string) => {
    if (platformType.includes('windows')) return <Monitor className="w-4 h-4 text-blue-500" />;
    if (platformType.includes('macos')) return <Apple className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />;
    if (platformType.includes('linux')) return <FileCode2 className="w-4 h-4 text-amber-500" />;
    return <Package className="w-4 h-4 text-zinc-500" />;
  };

  // Parse release notes Markdown into beautiful, sanitized HTML
  const releaseNotesHtml = useMemo(() => {
    if (!result?.release?.body) return '';
    try {
      const sanitized = result.release.body
        .replace(/PDFCraft/gi, 'iCreatePDF')
        .replace(/pdfcraft/gi, 'icreatepdf');
      return marked.parse(sanitized, { gfm: true, breaks: true }) as string;
    } catch {
      return result.release.body;
    }
  }, [result?.release?.body]);

  const handleDownload = async (asset: ReleaseAsset, useMirror = false) => {
    const url = useMirror && asset.mirrorDownloadUrl ? asset.mirrorDownloadUrl : asset.browserDownloadUrl;
    setDownloadNotice({
      status: 'opening',
      text: getMsg('openingBrowser', 'Opening default browser...'),
    });

    const success = await openExternalUrl(url);
    if (success) {
      setDownloadNotice({
        status: 'success',
        text: getMsg(
          'downloadStartedNotice',
          'Download opened in your browser! If not started, click copy to paste link manually.'
        ),
      });
    } else {
      setDownloadNotice({
        status: 'failed',
        text: getMsg(
          'downloadFailedNotice',
          'Could not open browser automatically. Please click copy to paste link manually.'
        ),
      });
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2500);
      setDownloadNotice({
        status: 'success',
        text: getMsg('linkCopied', 'Download link copied to clipboard!'),
      });
    } catch {
      // fallback
    }
  };

  const handleOpenGitHub = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const url = result?.release?.htmlUrl || `https://github.com/${GITHUB_REPO}/releases`;
    openExternalUrl(url);
  };

  const handleSkipVersion = () => {
    if (result?.latestVersion) {
      ignoreVersion(result.latestVersion);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getMsg('title', 'Software Update')}
      size="lg"
      className="max-w-lg rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950"
    >
      <div className="space-y-3.5">
        {/* State: Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center">
                <RefreshCw className="h-7 w-7 animate-spin text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                {getMsg('checking', 'Checking for updates...')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Connecting to iCreatePDF release registry
              </p>
            </div>
          </div>
        )}

        {/* State: Error */}
        {!loading && result?.error && (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shadow-inner">
              <AlertCircle className="h-7 w-7" />
            </div>
            <div className="space-y-1.5 max-w-md">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                {getMsg('errorTitle', 'Unable to check for updates')}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {result.error}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <Button variant="outline" size="sm" onClick={onRetry} className="gap-2 rounded-xl">
                <RefreshCw className="h-3.5 w-3.5" />
                {getMsg('retry', 'Retry')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20"
                onClick={handleOpenGitHub}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{getMsg('viewOnGithub', 'View on GitHub')}</span>
              </Button>
            </div>
          </div>
        )}

        {/* State: Up to date */}
        {!loading && !result?.error && !result?.hasUpdate && (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                {getMsg('latest', 'You are up to date!')}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {getMsg(
                  'latestDesc',
                  'iCreatePDF is currently at the latest version ({version}).',
                  { version: result?.currentVersion || '' }
                )}
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all cursor-pointer"
              >
                {getMsg('close', 'Close')}
              </button>
            </div>
          </div>
        )}

        {/* State: Update available */}
        {!loading && !result?.error && result?.hasUpdate && (
          <div className="space-y-3">
            {/* Compact Hero Version Banner */}
            <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-white to-red-50/20 dark:from-zinc-900/90 dark:via-zinc-900 dark:to-red-950/15 p-3 shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-red-500/20 shrink-0">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm text-zinc-950 dark:text-white tracking-tight">
                        {getMsg('available', 'New Version Available')}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {result.latestVersion}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px]">
                        {getMsg('currentVersion', 'Current')}:
                        <code className="font-mono text-[10px] bg-zinc-200/70 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                          {result.currentVersion}
                        </code>
                      </span>
                      <ArrowRight className="w-2.5 h-2.5 text-zinc-400" />
                      <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">
                        {result.latestVersion}
                      </span>
                      {result.release?.publishedAt && (
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 ml-1 pl-1.5 border-l border-zinc-200 dark:border-zinc-800">
                          <Calendar className="w-3 h-3" />
                          {new Date(result.release.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Rich Markdown Release Notes */}
            {releaseNotesHtml && (
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowReleaseNotes(!showReleaseNotes)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-zinc-500 dark:text-zinc-400">
                    {getMsg('releaseNotes', 'Release Notes')}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">
                    {showReleaseNotes ? 'Hide changelog' : 'View changelog'}
                    {showReleaseNotes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {showReleaseNotes && (
                  <div
                    className="max-h-36 overflow-y-auto px-3.5 pb-3 pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed scrollbar-thin
                      [&_h2]:text-xs [&_h2]:font-bold [&_h2]:text-zinc-950 dark:[&_h2]:text-white [&_h2]:mb-1 [&_h2]:mt-1
                      [&_h3]:text-[11px] [&_h3]:font-bold [&_h3]:text-zinc-900 dark:[&_h3]:text-zinc-200 [&_h3]:mb-1 [&_h3]:mt-2
                      [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_ul]:my-1.5
                      [&_li]:text-[11px] [&_li]:text-zinc-600 dark:[&_li]:text-zinc-300
                      [&_strong]:font-semibold [&_strong]:text-zinc-950 dark:[&_strong]:text-white
                      [&_code]:font-mono [&_code]:text-[10px] [&_code]:bg-zinc-200/80 dark:[&_code]:bg-zinc-800 [&_code]:text-red-600 dark:[&_code]:text-red-400 [&_code]:px-1 [&_code]:py-0.2 [&_code]:rounded
                      [&_p]:my-1 [&_p]:text-[11px]
                    "
                    dangerouslySetInnerHTML={{ __html: releaseNotesHtml }}
                  />
                )}
              </div>
            )}

            {/* Download Action Cards */}
            <div className="space-y-2 pt-0.5">
              {/* Primary Download Card */}
              {result.matchedAssets.primary && (
                <div className="rounded-xl border border-red-500/25 bg-red-50/30 dark:bg-red-950/20 p-2.5 px-3 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-zinc-950 dark:text-white whitespace-nowrap">
                          {getAssetLabel(result.matchedAssets.primary)}
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-red-600 text-white shrink-0 shadow-xs">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                        {cleanAssetName(result.matchedAssets.primary.name)} • {formatFileSize(result.matchedAssets.primary.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(result.matchedAssets.primary!.browserDownloadUrl)}
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title={getMsg('copyLink', 'Copy download link')}
                      aria-label="Copy direct download link"
                    >
                      {copiedUrl === result.matchedAssets.primary!.browserDownloadUrl ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(result.matchedAssets.primary!)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Secondary Download Card (e.g. Windows Installer) */}
              {result.matchedAssets.secondary && (
                <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-2.5 px-3 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs sm:text-sm text-zinc-950 dark:text-white block whitespace-nowrap">
                        {getAssetLabel(result.matchedAssets.secondary)}
                      </span>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                        {cleanAssetName(result.matchedAssets.secondary.name)} • {formatFileSize(result.matchedAssets.secondary.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(result.matchedAssets.secondary!.browserDownloadUrl)}
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title={getMsg('copyLink', 'Copy download link')}
                      aria-label="Copy installer download link"
                    >
                      {copiedUrl === result.matchedAssets.secondary!.browserDownloadUrl ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(result.matchedAssets.secondary!)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-98 font-semibold text-xs transition-all flex items-center gap-1.5 text-zinc-900 dark:text-white cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Status Feedback Notification */}
              {downloadNotice && (
                <div
                  className={`p-2 rounded-lg text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200 ${
                    downloadNotice.status === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : downloadNotice.status === 'failed'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
                      : 'bg-red-50/80 dark:bg-red-950/40 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900/60'
                  }`}
                >
                  {downloadNotice.status === 'success' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : downloadNotice.status === 'failed' ? (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5 shrink-0 animate-spin text-red-600 dark:text-red-400" />
                  )}
                  <span className="flex-1 font-medium">{downloadNotice.text}</span>
                </div>
              )}

              {/* Fast Mirror Download Strip */}
              {result.matchedAssets.primary?.mirrorDownloadUrl && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/40 text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Fast Mirror</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(result.matchedAssets.primary!.mirrorDownloadUrl!)}
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{getMsg('copyMirrorLink', 'Copy mirror link')}</span>
                    </button>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <button
                      type="button"
                      onClick={() => handleDownload(result.matchedAssets.primary!, true)}
                      className="font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                    >
                      Download Mirror →
                    </button>
                  </div>
                </div>
              )}

              {/* All Platform Downloads Accordion */}
              {result.matchedAssets.all.length > 0 && (
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowAllAssets(!showAllAssets)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer py-0.5"
                  >
                    <span>{getMsg('allDownloads', 'View all platform downloads')}</span>
                    {showAllAssets ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </button>

                  {showAllAssets && (
                    <div className="mt-1.5 space-y-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 p-2 bg-zinc-50/70 dark:bg-zinc-900/50 max-h-40 overflow-y-auto">
                      {result.matchedAssets.all.map((asset) => (
                        <div
                          key={asset.name}
                          className="flex items-center justify-between py-1.5 px-2.5 hover:bg-white dark:hover:bg-zinc-800/70 rounded-lg transition-colors text-xs border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/60"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {getPlatformIcon(asset.platformType)}
                            <div className="min-w-0">
                              <span className="font-mono font-medium truncate block max-w-[200px] sm:max-w-[260px] text-zinc-800 dark:text-zinc-200 text-[11px]">
                                {cleanAssetName(asset.name)}
                              </span>
                              <span className="text-[10px] text-zinc-400">
                                {formatFileSize(asset.size)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                              title={getMsg('copyLink', 'Copy link')}
                              onClick={() => handleCopyLink(asset.browserDownloadUrl)}
                            >
                              {copiedUrl === asset.browserDownloadUrl ? (
                                <Check className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                            <button
                              type="button"
                              className="px-2 py-1 rounded-md bg-zinc-200/70 hover:bg-red-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-red-600 font-semibold text-[10px] text-zinc-800 dark:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                              onClick={() => handleDownload(asset)}
                            >
                              <Download className="h-2.5 w-2.5" />
                              <span>Get</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Compact Executive Footer Bar */}
            <div className="flex items-center justify-between pt-2.5 border-t border-zinc-200/80 dark:border-zinc-800 text-xs">
              <button
                type="button"
                onClick={handleOpenGitHub}
                className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer font-medium"
              >
                <span>{getMsg('viewOnGithub', 'View on GitHub')}</span>
                <ExternalLink className="h-3 w-3" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSkipVersion}
                  className="px-2.5 py-1 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-[11px] font-medium cursor-pointer"
                >
                  {getMsg('skipVersion', 'Skip this version')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {getMsg('remindLater', 'Remind me later')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
