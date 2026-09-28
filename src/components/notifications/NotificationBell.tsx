'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, BellRing, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import {
  getNotificationStatus,
  subscribeToNotifications,
  unsubscribeFromNotifications,
  type NotificationStatus,
} from '@/lib/firebase/messaging';
import { analytics } from '@/lib/analytics';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<NotificationStatus>({
    isSupported: false,
    isConfigured: false,
    permission: 'default',
    isSubscribed: false,
  });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load notification status on mount
  useEffect(() => {
    let mounted = true;
    getNotificationStatus().then((s) => {
      if (mounted) setStatus(s);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      mounted = false;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleOpen = async () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    setFeedbackMessage(null);
    if (nextOpen) {
      const s = await getNotificationStatus();
      setStatus(s);
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setFeedbackMessage(null);

    const result = await subscribeToNotifications();
    const updatedStatus = await getNotificationStatus();
    setStatus(updatedStatus);
    setLoading(false);

    if (result.success) {
      setFeedbackMessage({
        text: 'Notifications enabled! You will receive updates about new tools & features.',
        type: 'success',
      });
    } else {
      setFeedbackMessage({
        text: result.error || 'Unable to enable notifications.',
        type: 'error',
      });
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    setFeedbackMessage(null);

    await unsubscribeFromNotifications();
    const updatedStatus = await getNotificationStatus();
    setStatus(updatedStatus);
    setLoading(false);

    setFeedbackMessage({
      text: 'Push notifications turned off.',
      type: 'info',
    });
  };

  if (!status.isSupported) {
    return null; // Browser doesn't support Web Push (e.g. some webviews/older browsers)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggleOpen}
        className={`p-2 rounded-lg transition-colors relative ${
          status.isSubscribed
            ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
        aria-label="Notification Preferences"
        title={status.isSubscribed ? 'Notifications Enabled' : 'Enable Notifications'}
      >
        {status.isSubscribed ? (
          <BellRing className="w-5 h-5 text-emerald-500 animate-pulse" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
        {status.isSubscribed && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Push Notifications
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {status.isSubscribed
                    ? 'Subscribed to iCreatePDF updates'
                    : 'Get notified of new tools & updates'}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider ${
                status.isSubscribed
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : status.permission === 'denied'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                  : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {status.isSubscribed
                ? 'Active'
                : status.permission === 'denied'
                ? 'Blocked'
                : 'Off'}
            </span>
          </div>

          <div className="py-3 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
            <p>You will only receive relevant notifications for:</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-500 dark:text-zinc-400 pl-1 text-[11px]">
              <li>New PDF tool releases</li>
              <li>Major feature updates & improvements</li>
              <li>Important website announcements</li>
            </ul>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic">
              No spam. No promotional clutter. Client-side privacy guaranteed.
            </p>
          </div>

          {feedbackMessage && (
            <div
              className={`mb-3 p-2.5 rounded-xl text-xs flex items-start space-x-2 ${
                feedbackMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : feedbackMessage.type === 'error'
                  ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {feedbackMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              )}
              <span>{feedbackMessage.text}</span>
            </div>
          )}

          {status.permission === 'denied' && (
            <div className="mb-3 p-2.5 rounded-xl text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
              Browser notifications are currently blocked. To enable them, click the padlock/settings icon in your browser address bar and set Notifications to &ldquo;Allow&rdquo;.
            </div>
          )}

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end space-x-2">
            {status.isSubscribed ? (
              <button
                onClick={handleUnsubscribe}
                disabled={loading}
                className="w-full py-2 px-3 text-xs font-medium rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <BellOff className="w-3.5 h-3.5" />
                )}
                <span>Turn Off Notifications</span>
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                disabled={loading || status.permission === 'denied'}
                className="w-full py-2 px-3 text-xs font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Bell className="w-3.5 h-3.5" />
                )}
                <span>Enable Notifications</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
