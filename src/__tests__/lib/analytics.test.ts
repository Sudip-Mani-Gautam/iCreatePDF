import { describe, it, expect, beforeEach, vi } from 'vitest';
import { analytics } from '@/lib/analytics';

describe('Analytics & DataLayer Service', () => {
  beforeEach(() => {
    window.dataLayer = [];
    vi.clearAllMocks();
  });

  it('initializes and pushes events to dataLayer', () => {
    analytics.track('test_event', { status: 'ok', count: 1 });

    expect(window.dataLayer).toBeDefined();
    expect(window.dataLayer?.length).toBe(1);
    const event = window.dataLayer?.[0];
    expect(event?.event).toBe('test_event');
    expect(event?.status).toBe('ok');
    expect(event?.count).toBe(1);
    expect(typeof event?.timestamp).toBe('number');
  });

  it('strictly strips sensitive parameters (filenames, text, passwords, emails)', () => {
    analytics.track('privacy_check', {
      tool_name: 'merge-pdf',
      filename: 'confidential_contract.pdf',
      content: 'Secret text content',
      password: 'mypassword123',
      email: 'user@example.com',
      signature: 'base64...',
    });

    const event = window.dataLayer?.[0];
    expect(event?.tool_name).toBe('merge-pdf');
    expect(event?.filename).toBeUndefined();
    expect(event?.content).toBeUndefined();
    expect(event?.password).toBeUndefined();
    expect(event?.email).toBeUndefined();
    expect(event?.signature).toBeUndefined();
  });

  it('tracks tool_open with tool_name, tool_category, and page_path', () => {
    analytics.toolOpen({
      tool_name: 'merge-pdf',
      tool_category: 'organize-manage',
      page_path: '/en/merge-pdf',
    });

    const event = window.dataLayer?.[0];
    expect(event?.event).toBe('tool_open');
    expect(event?.tool_name).toBe('merge-pdf');
    expect(event?.tool_category).toBe('organize-manage');
    expect(event?.page_path).toBe('/en/merge-pdf');
  });

  it('tracks file_selected with generic file_type and never filenames', () => {
    analytics.fileSelected({
      tool_name: 'compress-pdf',
      file_type: '.pdf',
    });

    const event = window.dataLayer?.[0];
    expect(event?.event).toBe('file_selected');
    expect(event?.tool_name).toBe('compress-pdf');
    expect(event?.file_type).toBe('pdf');
  });

  it('tracks tool_process_start, tool_process_complete, and tool_process_error', () => {
    analytics.toolProcessStart({ tool_name: 'split-pdf' });
    analytics.toolProcessComplete({
      tool_name: 'split-pdf',
      processing_time_ms: 125.4,
      file_count: 3,
    });
    analytics.toolProcessError({
      tool_name: 'split-pdf',
      error_type: 'invalid_page_range',
    });

    expect(window.dataLayer?.length).toBe(3);

    const start = window.dataLayer?.[0];
    expect(start?.event).toBe('tool_process_start');
    expect(start?.tool_name).toBe('split-pdf');

    const complete = window.dataLayer?.[1];
    expect(complete?.event).toBe('tool_process_complete');
    expect(complete?.processing_time_ms).toBe(125);
    expect(complete?.file_count).toBe(3);

    const err = window.dataLayer?.[2];
    expect(err?.event).toBe('tool_process_error');
    expect(err?.error_type).toBe('invalid_page_range');
  });

  it('tracks file_download with sanitized output format', () => {
    analytics.fileDownload({
      tool_name: 'pdf-to-word',
      output_format: '.docx',
    });

    const event = window.dataLayer?.[0];
    expect(event?.event).toBe('file_download');
    expect(event?.tool_name).toBe('pdf-to-word');
    expect(event?.output_format).toBe('docx');
  });

  it('tracks page_view with sanitized location and path', () => {
    analytics.pageView('/en/tools', 'All Tools - iCreatePDF');

    const event = window.dataLayer?.[0];
    expect(event?.event).toBe('page_view');
    expect(event?.page_path).toBe('/en/tools');
    expect(event?.page_title).toBe('All Tools - iCreatePDF');
  });
});
