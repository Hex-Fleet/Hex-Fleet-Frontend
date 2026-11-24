'use client';

import { useEffect, useState } from 'react';
import { checkHealth } from '../lib/api';

// Live API liveness indicator for the top bar (replaces a static label).
export default function SystemStatus() {
  const [state, setState] = useState({ status: 'checking' });

  useEffect(() => {
    let active = true;
    const probe = async () => {
      const result = await checkHealth();
      if (active) setState(result.ok ? { status: 'online' } : { status: 'offline', kind: result.kind });
    };
    probe();
    const timer = setInterval(probe, 30000);
    return () => { active = false; clearInterval(timer); };
  }, []);

  const label = state.status === 'online' ? 'API online' : state.status === 'offline' ? 'API offline' : 'Checking API…';
  return <div className={`system-status system-status-${state.status}`} title={label}>
    <span className={`pulse-dot ${state.status === 'offline' ? 'pulse-offline' : state.status === 'online' ? 'pulse-online' : 'pulse-unknown'}`} />
    {label}
  </div>;
}
