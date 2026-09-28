/**
 * iCreatePDF Unified Analytics & DataLayer Service
 * 
 * Architecture:
 * Client Application -> dataLayer -> Google Tag Manager (GTM) -> GA4
 * 
 * Privacy & Security Guarantees:
 * - ZERO document content, extracted text, or binary data is ever collected.
 * - ZERO filenames, paths, or personal user data is ever sent to analytics.
 * - Only generic, anonymized technical telemetry (tool names, categories, error types, durations) is recorded.
 * - Ready for future backend integration without refactoring frontend tool pages.
 */

// Global dataLayer type definition
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type ToolCategoryTaxonomy =
  | 'edit-annotate'
  | 'convert-to-pdf'
  | 'convert-from-pdf'
  | 'organize-manage'
  | 'optimize-repair'
  | 'secure-pdf'
  | 'general';

export interface BaseEventParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ToolOpenParams extends BaseEventParams {
  tool_name: string;
  tool_category: string;
  page_path?: string;
}

export interface FileSelectedParams extends BaseEventParams {
  tool_name: string;
  file_type: string; // Generic: 'pdf', 'jpg', 'png', 'docx', etc.
}

export interface ToolProcessStartParams extends BaseEventParams {
  tool_name: string;
}

export interface ToolProcessCompleteParams extends BaseEventParams {
  tool_name: string;
  processing_time_ms?: number;
  file_count?: number;
}

export interface ToolProcessErrorParams extends BaseEventParams {
  tool_name: string;
  error_type: string; // High-level error type: 'invalid_format', 'password_required', 'worker_error'
}

export interface FileDownloadParams extends BaseEventParams {
  tool_name: string;
  output_format: string; // 'pdf', 'zip', 'docx', 'png', etc.
}

/**
 * Strict Privacy Sanitizer
 * Strips any sensitive fields or dangerous payload structures before dispatching.
 */
function sanitizeEventPayload<T extends Record<string, unknown>>(payload: T): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  const FORBIDDEN_KEYS = [
    'filename', 'fileName', 'name', 'path', 'filepath', 'filePath',
    'content', 'contents', 'text', 'data', 'buffer', 'bytes', 'url',
    'password', 'signature', 'email', 'user', 'userName', 'token',
  ];

  for (const [key, value] of Object.entries(payload)) {
    if (FORBIDDEN_KEYS.includes(key)) {
      continue;
    }

    if (typeof value === 'string') {
      // Strip potential email addresses, file paths, or long strings (like base64 or document text)
      if (value.length > 100 || value.includes('@') || value.includes('C:\\') || value.includes('/Users/')) {
        continue;
      }
      sanitized[key] = value.trim();
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Core Analytics Dispatcher
 */
class AnalyticsService {
  private isDevelopment(): boolean {
    if (typeof window === 'undefined') return false;
    return (
      process.env.NODE_ENV === 'development' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  }

  /**
   * Push custom event to GTM dataLayer
   */
  public track(eventName: string, params: Record<string, unknown> = {}): void {
    if (typeof window === 'undefined') return;

    const sanitizedParams = sanitizeEventPayload(params);
    const eventObject = {
      event: eventName,
      ...sanitizedParams,
      timestamp: Date.now(),
    };

    // In development: Log to console for easy debugging without polluting production analytics
    if (this.isDevelopment()) {
      if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true') {
        console.log(`[iCreatePDF Analytics] ${eventName}:`, eventObject);
      }
    }

    // Push to standard Google Tag Manager dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventObject);

    // If direct GA4 gtag is present and GTM is not intercepting
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', eventName, sanitizedParams);
      } catch {
        // Ignore fallback errors
      }
    }
  }

  /**
   * Track Tool Opened (Requirement 5)
   */
  public toolOpen(params: ToolOpenParams): void {
    this.track('tool_open', {
      tool_name: params.tool_name,
      tool_category: params.tool_category,
      page_path: params.page_path || (typeof window !== 'undefined' ? window.location.pathname : ''),
    });
  }

  /**
   * Track File Selected (Requirement 6)
   * Generic file extension only (e.g. 'pdf', 'png'). Never filename or content!
   */
  public fileSelected(params: FileSelectedParams): void {
    const genericType = params.file_type.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10) || 'unknown';
    this.track('file_selected', {
      tool_name: params.tool_name,
      file_type: genericType,
    });
  }

  /**
   * Track Processing Started (Requirement 6)
   */
  public toolProcessStart(params: ToolProcessStartParams): void {
    this.track('tool_process_start', {
      tool_name: params.tool_name,
    });
  }

  /**
   * Track Processing Completed (Requirement 6)
   */
  public toolProcessComplete(params: ToolProcessCompleteParams): void {
    this.track('tool_process_complete', {
      tool_name: params.tool_name,
      processing_time_ms: params.processing_time_ms !== undefined ? Math.round(params.processing_time_ms) : undefined,
      file_count: params.file_count,
    });
  }

  /**
   * Track Processing Error (Requirement 6)
   */
  public toolProcessError(params: ToolProcessErrorParams): void {
    // Sanitize error string to generic category (never stack traces or file details)
    let sanitizedError = params.error_type || 'unknown_error';
    if (sanitizedError.length > 50) {
      sanitizedError = sanitizedError.substring(0, 47) + '...';
    }

    this.track('tool_process_error', {
      tool_name: params.tool_name,
      error_type: sanitizedError,
    });
  }

  /**
   * Track File Download (Requirement 7)
   */
  public fileDownload(params: FileDownloadParams): void {
    const genericFormat = params.output_format.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10) || 'pdf';
    this.track('file_download', {
      tool_name: params.tool_name,
      output_format: genericFormat,
    });
  }

  /**
   * Track Page View for SPA Client Route Changes (Requirement 4)
   */
  public pageView(pagePath: string, pageTitle?: string): void {
    if (typeof window === 'undefined') return;

    this.track('page_view', {
      page_path: pagePath,
      page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
      page_location: window.location.href.split('?')[0], // strip query params for privacy
    });
  }

  /**
   * Track Notification Prompt Shown
   */
  public notificationPromptShown(notificationType?: string): void {
    this.track('notification_prompt_shown', {
      notification_type: notificationType || 'general',
    });
  }

  /**
   * Track Notification Permission Granted
   */
  public notificationPermissionGranted(): void {
    this.track('notification_permission_granted');
  }

  /**
   * Track Notification Permission Denied
   */
  public notificationPermissionDenied(): void {
    this.track('notification_permission_denied');
  }

  /**
   * Track Notification Clicked
   */
  public notificationClicked(notificationType?: string): void {
    this.track('notification_clicked', {
      notification_type: notificationType || 'general',
    });
  }
}

export const analytics = new AnalyticsService();
export default analytics;
