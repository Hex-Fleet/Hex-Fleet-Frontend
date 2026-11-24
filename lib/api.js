const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getDashboardData(path, fallback) {
  try {
    const response = await fetch(`${apiUrl}${path}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Dashboard API returned ${response.status}`);
    const payload = await response.json();
    return payload.data ?? fallback;
  } catch {
    return fallback;
  }
}

export function formatDate(value, fallback = '—') {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
