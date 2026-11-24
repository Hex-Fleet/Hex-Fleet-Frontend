'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const finishTimer = window.setTimeout(() => setLoading(false), 420);
    const handleClick = (event) => {
      const link = event.target.closest?.('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//') || href === pathname) return;
      setLoading(true);
    };
    document.addEventListener('click', handleClick, true);
    return () => { window.clearTimeout(finishTimer); document.removeEventListener('click', handleClick, true); };
  }, [pathname]);

  if (!loading) return null;
  return <div className="global-loader" role="status" aria-live="polite" aria-label="Loading page"><div className="global-loader-card"><div className="global-loader-mark">H</div><div className="global-loader-spinner" /><strong>Loading HexFleet</strong><span>Updating the control room…</span></div></div>;
}
