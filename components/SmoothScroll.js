'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const wrapper = document.querySelector('.page-content');
    if (!wrapper) return undefined;
    const lenis = new Lenis({ wrapper, content: wrapper, duration: 1.2, smoothWheel: true, gestureOrientation: 'vertical' });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
  return null;
}
