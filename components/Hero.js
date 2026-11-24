'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => gsap.from('.hero-reveal', { y: 40, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out' }), root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} className="min-h-screen border-b border-white/10 px-6 py-8"><nav className="mx-auto flex max-w-6xl items-center justify-between"><span className="text-xl font-bold tracking-tight">HEX<span className="text-lime-300">FLEET</span></span><span className="text-xs uppercase tracking-[.2em] text-white/50">Control / 01</span></nav><div className="mx-auto flex max-w-6xl flex-col justify-center py-32 sm:py-48"><p className="hero-reveal eyebrow">Fleet intelligence, in motion</p><h1 className="hero-reveal mt-6 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.06em] sm:text-8xl">Move smarter.<br /><span className="text-white/40">Scale further.</span></h1><p className="hero-reveal mt-8 max-w-md text-lg leading-relaxed text-white/55">A precise command center for the people and machines that keep the world moving.</p></div></section>;
}
