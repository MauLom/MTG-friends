/**
 * Central telemetry tracking utility
 * Non-invasive hooks for tracking user interactions
 * No vendor code - ready for future wiring to analytics service
 */

interface TelemetryEvent {
  event: string;
  data?: Record<string, unknown>;
  timestamp?: number;
}

/**
 * Central track function for all telemetry events
 * Currently logs to console.debug for development visibility
 * Can be wired to analytics service (e.g., Amplitude, Mixpanel) in the future
 */
export function track(event: string, data?: Record<string, unknown>): void {
  const telemetryEvent: TelemetryEvent = {
    event,
    data,
    timestamp: Date.now(),
  };

  // Development logging - visible in dev tools
  console.debug('[Telemetry]', telemetryEvent.event, telemetryEvent.data);

  // TODO: Wire to analytics service
  // Example: analytics.track(telemetryEvent.event, telemetryEvent.data);
}

/**
 * Device detection helper for telemetry context
 * Returns 'mobile', 'tablet', or 'desktop'
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}
