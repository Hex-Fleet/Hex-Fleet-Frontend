import Link from 'next/link';
import AppShell from '../components/AppShell';
import { MetricCard, PageHeader, SectionHeading, StatusPill } from '../components/UI';

const fleetRows = [
  { name: 'Campus North · 01', id: 'TN 99 Z 5641', status: 'On route', location: 'Avinashi Road', fuel: '74%', speed: '42 km/h', color: 'green' },
  { name: 'Campus North · 02', id: 'TN 38 AB 2109', status: 'At stop', location: 'Peelamedu', fuel: '58%', speed: '0 km/h', color: 'amber' },
  { name: 'Campus South · 01', id: 'TN 37 C 8821', status: 'On route', location: 'Singanallur', fuel: '86%', speed: '31 km/h', color: 'green' },
  { name: 'College shuttle · 04', id: 'TN 40 D 7004', status: 'Offline', location: 'Last seen 12m ago', fuel: '41%', speed: '—', color: 'red' }
];

export default function OverviewPage() {
  return <AppShell><PageHeader eyebrow="Tuesday · 24 November 2026" title="Good morning, Vikram." description="Here’s the signal across your connected fleet." action={<Link className="primary-button" href="/devices">+ Register device</Link>} />
    <div className="metric-grid"><MetricCard label="Active vehicles" value="18 / 20" detail="2 need attention" trend="+8.2%" /><MetricCard label="Students onboard" value="684" detail="Across 18 vehicles" trend="+4.6%" accent="violet" /><MetricCard label="Average fuel level" value="68.4%" detail="Last 30 minutes" trend="+2.1%" accent="blue" /><MetricCard label="Attendance scans" value="1,248" detail="Today so far" trend="+12.8%" accent="orange" /></div>
    <div className="dashboard-grid"><section className="panel fleet-panel"><SectionHeading title="Fleet pulse" detail="Live vehicle telemetry" action={<Link href="/devices" className="text-link">View all →</Link>} /><div className="fleet-table"><div className="fleet-table-head"><span>Vehicle</span><span>Status</span><span>Location</span><span>Fuel</span><span>Speed</span></div>{fleetRows.map((row) => <div className="fleet-row" key={row.id}><div className="vehicle-cell"><span className={`vehicle-dot dot-${row.color}`} /><div><strong>{row.name}</strong><small>{row.id}</small></div></div><StatusPill tone={row.color}>{row.status}</StatusPill><span className="muted-cell">{row.location}</span><div className="fuel-cell"><span className="fuel-track"><i style={{ width: row.fuel }} /></span><span>{row.fuel}</span></div><span className="speed-cell">{row.speed}</span></div>)}</div></section>
      <section className="panel signal-panel"><SectionHeading title="Signal health" detail="Device network status" /><div className="signal-ring"><div><strong>94</strong><span>/ 100</span></div></div><p className="signal-caption">Excellent fleet connectivity</p><div className="signal-list"><div><span><i className="dot green" />Online</span><strong>18</strong></div><div><span><i className="dot amber" />Delayed</span><strong>1</strong></div><div><span><i className="dot red" />Offline</span><strong>1</strong></div></div></section></div>
    <section className="panel activity-panel"><SectionHeading title="Today’s activity" detail="A quick read of the network" action={<Link href="/attendance" className="text-link">Open attendance →</Link>} /><div className="activity-chart"><div className="chart-y"><span>300</span><span>200</span><span>100</span><span>0</span></div><div className="chart-body"><div className="chart-gridlines" />{[35, 44, 38, 58, 49, 72, 64, 81, 68, 92, 74, 86].map((height, index) => <div className="bar-wrap" key={index}><div className="bar" style={{ height: `${height}%` }} /><span>{['06','07','08','09','10','11','12','13','14','15','16','17'][index]}</span></div>)}</div></div></section>
  </AppShell>;
}
