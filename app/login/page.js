'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../../src/logo/Hexfleet Smart Fleet Solutions (1).png';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(process.env.NEXT_PUBLIC_API_MODE !== 'live');
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!preview) {
      setMessage('Authentication is not connected to the live API yet.');
      return;
    }
    setMessage('Local preview sign-in simulated.');
    window.setTimeout(() => router.push('/'), 350);
  };
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? 'dark' : 'light'; };
  return <main className="login-page"><section className="login-story"><Image src={logo} alt="HexFleet Smart Fleet Solutions" className="login-logo" priority /><div><p className="eyebrow">Institution mobility intelligence</p><h1>Move every campus journey with confidence.</h1><p>One control room for RGU fleet operations, attendance, fuel and the people who keep students moving.</p></div><div className="story-points"><span><strong>GPS</strong> Fleet visibility</span><span><strong>RFID</strong> Attendance clarity</span><span><strong>A22</strong> Fuel context</span></div></section><section className="login-panel"><div className="login-form-wrap"><div className="login-header-row"><p className="eyebrow">RGU institution dashboard</p><button className="theme-button" type="button" onClick={toggleTheme}>{dark ? 'Light theme' : 'Dark theme'}</button></div><h2>Welcome back</h2><p className="login-subtitle">Sign in to your HexFleet workspace.</p><form onSubmit={submit}><label>Email address<input type="email" autoComplete="email" placeholder="name@rgu.ac.in" required /></label><label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div></label><div className="login-options"><label className="remember"><input type="checkbox" /> Remember me</label><span>Password reset requires the connected auth service.</span></div>{message && <p className={`login-message ${preview ? 'login-preview' : 'login-warning'}`}>{message}</p>}<button className="login-submit">Sign in</button></form><p className="login-mode">{preview ? 'Local preview mode: no credentials are sent.' : 'Live mode: authentication endpoint pending.'}</p></div></section></main>;
}
