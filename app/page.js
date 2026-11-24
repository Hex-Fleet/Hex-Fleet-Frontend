import Link from 'next/link';
import AppShell from '../components/AppShell';
import { MetricCard, PageHeader, SectionHeading, StatusPill } from '../components/UI';
import { getDashboardData } from '../lib/api';

export const dynamic = 'force-dynamic';

function percent(value) { return value == null ? '—' : `${Number(value).toFixed(1)} L`; }

function activityBars(entries) {
  const hours = Array.from({ length: 12 }, (_, index) => index + 6);
  const counts = hours.map((hour) => entries.filter((entry) => new Date(entry.scannedAt).getHours() === hour).length);
  const max = Math.max(...counts, 1);
  return counts.map((count) => Math.max(4, Math.round((count / max) * 92)));
}

export default async function OverviewPage() {
  const snapshot = await getDashboardData('/api/dashboard/overview', { metrics: {}, signal: {}, devices: [], recentAttendance: [] });
  const metrics = snapshot.metrics ?? {};
  const signal = snapshot.signal ?? {};
  const devices = snapshot.devices ?? [];
  const recentAttendance = snapshot.recentAttendance ?? [];
  return <AppShell><PageHeader eyebrow="Live fleet signal" title="Good morning, Vikram." description="This overview is connected to the HexFleet API and PostgreSQL data layer." action={<Link className="primary-button" href="/devices">+ Register device</Link>} />
    <div className="metric-grid"><MetricCard label="Active devices" value={`${metrics.activeVehicles ?? 0} / ${metrics.totalVehicles ?? 0}`} detail="Based on last 10 minutes" /><MetricCard label="Students onboard" value={metrics.studentsOnboard ?? 0} detail="Live attendance state" accent="violet" /><MetricCard label="Average fuel reading" value={percent(metrics.averageFuel)} detail="From registered sensors" accent="blue" /><MetricCard label="Attendance scans" value={metrics.attendanceToday ?? 0} detail="Today from PostgreSQL" accent="orange" /></div>
    <div className="dashboard-grid"><section className="panel fleet-panel"><SectionHeading title="Fleet pulse" detail={`${devices.length} registered device${devices.length === 1 ? '' : 's'}`} action={<Link href="/devices" className="text-link">View all →</Link>} />{devices.length ? <div className="fleet-table"><div className="fleet-table-head"><span>Device</span><span>Status</span><span>Bus</span><span>Fuel</span><span>Speed</span></div>{devices.slice(0, 8).map((device) => <div className="fleet-row" key={device.transId}><div className="vehicle-cell"><span className={`vehicle-dot ${device.online ? 'dot-green' : 'dot-red'}`} /><div><strong>{device.name || 'ESP32 Fleet Node'}</strong><small>{device.macAddress}</small></div></div><StatusPill tone={device.online ? 'green' : 'red'}>{device.online ? 'Online' : 'Offline'}</StatusPill><span className="muted-cell">{device.bus || 'Unmapped'}</span><div className="fuel-cell"><span>{device.fuel?.litres == null ? '—' : `${device.fuel.litres} L`}</span></div><span className="speed-cell">{device.gps?.speed == null ? '—' : `${device.gps.speed} km/h`}</span></div>)}</div> : <div className="live-empty"><span>⌁</span><strong>No live devices yet</strong><p>Register an ESP32 controller to see telemetry here.</p><Link href="/devices" className="text-link">Open device registry →</Link></div>}</section>
      <section className="panel signal-panel"><SectionHeading title="Signal health" detail="Derived from device check-ins" /><div className="signal-ring"><div><strong>{devices.length ? Math.round(((signal.online ?? 0) / devices.length) * 100) : 0}</strong><span>/ 100</span></div></div><p className="signal-caption">{devices.length ? 'Current device connectivity' : 'Waiting for registered devices'}</p><div className="signal-list"><div><span><i className="dot green" />Online</span><strong>{signal.online ?? 0}</strong></div><div><span><i className="dot amber" />Delayed</span><strong>{signal.delayed ?? 0}</strong></div><div><span><i className="dot red" />Offline</span><strong>{signal.offline ?? 0}</strong></div></div></section></div>
    <section className="panel activity-panel"><SectionHeading title="Today’s attendance activity" detail="Hourly scans from the live register" action={<Link href="/attendance" className="text-link">Open attendance →</Link>} /><div className="activity-chart"><div className="chart-y"><span>High</span><span>Med</span><span>Low</span><span>0</span></div><div className="chart-body"><div className="chart-gridlines" />{activityBars(recentAttendance).map((height, index) => <div className="bar-wrap" key={index}><div className="bar" style={{ height: `${height}%` }} /><span>{String(index + 6).padStart(2, '0')}</span></div>)}</div></div></section>
  </AppShell>;
}
