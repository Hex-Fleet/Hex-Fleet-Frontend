'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';

export function showToast(message, type = 'success') { window.dispatchEvent(new CustomEvent('hexfleet:toast', { detail: { message, type } })); }
export default function ToastHost() {
  const [toast, setToast] = useState(null);
  useEffect(() => { const onToast = (event) => { setToast(event.detail); window.setTimeout(() => setToast(null), 4200); }; window.addEventListener('hexfleet:toast', onToast); return () => window.removeEventListener('hexfleet:toast', onToast); }, []);
  if (!toast) return null; const Icon = toast.type === 'error' ? XCircle : toast.type === 'info' ? Info : CheckCircle2;
  return <div className={`toast toast-${toast.type}`} role="status"><Icon size={18} /><span>{toast.message}</span><button onClick={() => setToast(null)} aria-label="Dismiss notification"><X size={15} /></button></div>;
}
