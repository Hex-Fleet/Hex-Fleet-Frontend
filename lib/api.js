const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const API_BASE_URL = apiUrl;

// Typed error so pages can distinguish an unreachable API from an API that
// responded with an error. No silent fallbacks: callers must handle failures.
export class ApiError extends Error {
  constructor(message, { status = 0, code = 'API_ERROR', kind = 'http' } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.kind = kind; // 'offline' | 'http' | 'invalid'
  }
}

async function request(path, { timeoutMs = 10000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    response = await fetch(`${apiUrl}${path}`, {
      cache: 'no-store',
      signal: controller.signal,
      headers: { accept: 'application/json' }
    });
  } catch (error) {
    // Network failure, DNS failure, TLS failure, CORS block or timeout.
    throw new ApiError('HexFleet could not reach the fleet API.', { kind: 'offline', code: 'OFFLINE' });
  } finally {
    clearTimeout(timer);
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.error?.message || payload?.error || `The fleet API responded with ${response.status}.`,
      { status: response.status, kind: 'http', code: payload?.error?.code || `HTTP_${response.status}` }
    );
  }
  if (payload === null) {
    throw new ApiError('The fleet API returned a response HexFleet could not read.', { kind: 'invalid', code: 'INVALID_RESPONSE' });
  }
  return payload;
}

// Returns the `data` field of a dashboard payload, or null when absent.
export async function getDashboardData(path) {
  const payload = await request(path);
  return payload?.data ?? null;
}

// Lightweight liveness probe used by the top bar. Never throws.
export async function checkHealth() {
  try {
    const payload = await request('/health', { timeoutMs: 5000 });
    return { ok: true, status: payload?.status ?? 'ok', payload };
  } catch (error) {
    return { ok: false, kind: error?.kind ?? 'http', message: error?.message ?? 'API unreachable' };
  }
}

export function formatDate(value, fallback = '—') {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
