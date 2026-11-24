'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function RetryButton({ label = 'Retry', className = 'secondary-button' }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [, startTransition] = useTransition();

  const retry = () => {
    setPending(true);
    startTransition(() => {
      router.refresh();
      setTimeout(() => setPending(false), 800);
    });
  };

  return <button type="button" className={className} onClick={retry} disabled={pending}>{pending ? 'Retrying…' : label}</button>;
}
