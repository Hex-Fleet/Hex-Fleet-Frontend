'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function FleetCharts({ attendance = [] }) {
  const data = useMemo(() => Array.from({ length: 12 }, (_, index) => { const hour = index + 6; return { hour: `${String(hour).padStart(2, '0')}:00`, scans: attendance.filter((entry) => new Date(entry.scannedAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }) === String(hour)).length }; }), [attendance]);
  return <div className="recharts-shell"><ResponsiveContainer width="100%" height={230}><BarChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}><CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} /><XAxis dataKey="hour" tick={{ fill: '#91a09b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fill: '#91a09b', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: 'rgba(183,243,75,.08)' }} contentStyle={{ border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, color: '#edf5ee', background: '#151d1f' }} labelStyle={{ color: '#b7f34b' }} /><Bar dataKey="scans" name="RFID scans" fill="#b7f34b" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>;
}
