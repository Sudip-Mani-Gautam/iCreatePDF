'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  shouldShowNotificationPrompt,
  dismissNotificationPrompt,
  subscribeToNotifications,
} from '@/lib/firebase/messaging';
import { analytics } from '@/lib/analytics';

export function NotificationPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Wait 5 seconds before showing to not disrupt initial page arrival
    const timer = setTimeout(() => {
      if (shouldShowNotificationPrompt()) {
        setIsVisible(true);
        analytics.notificationPromptShown('new_tool_updates');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    dismissNotificationPrompt();
  };

  const handleAllow = async () => {
    setIsSubmitting(true);
    const result = await subscribeToNotifications();
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    } else {
      // If user denied or dismissed native prompt
      setIsVisible(false);
      dismissNotificationPrompt();
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Notification Subscription Prompt"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-[calc(100vw-2.5rem)] p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      {success ? (
        <div className="flex items-center space-x-3 py-2 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Notifications enabled!</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              You will be notified when new PDF tools & features arrive.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  Stay updated with iCreatePDF
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Be first to know when new tools & features launch.
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-lg transition-colors"
              aria-label="Close notification prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Zero spam. No backend tracking. Unsubscribe anytime.</span>
          </div>

          <div className="mt-4 flex items-center justify-end space-x-2">
            <button
              onClick={handleDismiss}
              disabled={isSubmitting}
              className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors disabled:opacity-50"
            >
              Not now
            </button>
            <button
              onClick={handleAllow}
              disabled={isSubmitting}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 rounded-xl shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Enabling...' : 'Allow notifications'}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
