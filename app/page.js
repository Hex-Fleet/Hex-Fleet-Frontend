import Link from 'next/link';
import AppShell from '../components/AppShell';
import { MetricCard, PageHeader, SectionHeading, StatusPill } from '../components/UI';
import { ApiErrorState, EmptyState } from '../components/ApiState';
import { getDashboardData } from '../lib/api';
import RefreshButton from '../components/RefreshButton';

export const dynamic = 'force-dynamic';

function percent(value) { return value == null ? '—' : `${Number(value).toFixed(1)} L`; }

function activityBars(entries) {
  const hours = Array.from({ length: 12 }, (_, index) => index + 6);
  const counts = hours.map((hour) => entries.filter((entry) => new Date(entry.scannedAt).getHours() === hour).length);
  const max = Math.max(...counts, 1);
  return counts.map((count) => Math.max(4, Math.round((count / max) * 92)));
}

async function loadOverview() {
  try {
    const snapshot = await getDashboardData('/api/dashboard/overview');
    return { snapshot: snapshot ?? {}, error: null };
  } catch (error) {
    return { snapshot: null, error: { kind: error?.kind, message: error?.message, status: error?.status } };
  }
}

export default async function OverviewPage() {
  const { snapshot, error } = await loadOverview();
  const metrics = snapshot?.metrics ?? {};
  const signal = snapshot?.signal ?? {};
  const devices = snapshot?.devices ?? [];
  const recentAttendance = snapshot?.recentAttendance ?? [];

  return <AppShell>
    <PageHeader
      eyebrow="Live fleet signal"
      title="Fleet overview"
      description="Rathinam Global University fleet operations, attendance and device readiness."
      action={<div className="header-actions"><RefreshButton /><Link className="primary-button" href="/devices">Open devices</Link></div>}
    />
    {error ? <ApiErrorState error={error} /> : <>
      <div className="preview-banner"><span className="preview-badge">LIVE API</span><span>RGU telemetry is shown only when supplied by the connected API. Missing fleet summaries remain unavailable.</span></div>
      <div className="metric-grid five">
        <MetricCard label="Allocated vehicles" value={metrics.totalVehicles ?? '—'} detail="Tenant fleet allocation" />
        <MetricCard label="Moving" value={metrics.movingVehicles ?? '—'} detail="Current vehicle state" accent="violet" />
        <MetricCard label="Idle / stopped" value={metrics.idleVehicles ?? '—'} detail="Current vehicle state" accent="blue" />
        <MetricCard label="No signal" value={signal.offline ?? (devices.length ? '—' : '—')} detail="Device freshness" accent="orange" />
        <MetricCard label="Open alerts" value={metrics.openAlerts ?? '—'} detail="Requires alert API" accent="orange" />
      </div>
      <div className="dashboard-grid">
        <section className="panel fleet-panel">
          <SectionHeading title="Fleet pulse" detail={`${devices.length} registered device${devices.length === 1 ? '' : 's'}`} action={<Link href="/devices" className="text-link">View all →</Link>} />
          {devices.length ? <div className="fleet-table">
            <div className="fleet-table-head"><span>Device</span><span>Status</span><span>Bus</span><span>Fuel</span><span>Speed</span></div>
            {devices.slice(0, 8).map((device) => <div className="fleet-row" key={device.transId}>
              <div className="vehicle-cell"><span className={`vehicle-dot ${device.online ? 'dot-green' : 'dot-red'}`} /><div><strong>{device.name || 'ESP32 Fleet Node'}</strong><small>{device.macAddress}</small></div></div>
              <StatusPill tone={device.online ? 'green' : 'red'}>{device.online ? 'Online' : 'Offline'}</StatusPill>
              <span className="muted-cell">{device.bus || 'Unmapped'}</span>
              <div className="fuel-cell"><span>{device.fuel?.litres == null ? '—' : `${device.fuel.litres} L`}</span></div>
              <span className="speed-cell">{device.gps?.speed == null ? '—' : `${device.gps.speed} km/h`}</span>
            </div>)}
          </div> : <EmptyState icon="⌁" title="No live devices yet" message="Register an ESP32 controller to see telemetry here." action={<Link href="/devices" className="text-link">Open device registry →</Link>} />}
        </section>
        <section className="panel signal-panel">
          <SectionHeading title="Signal health" detail="Derived from device check-ins" />
           <div className="signal-ring"><div><strong>{devices.length ? Math.round(((signal.online ?? 0) / devices.length) * 100) : '—'}</strong><span>{devices.length ? '/ 100' : 'pending'}</span></div></div>
           <p className="signal-caption">{devices.length ? 'Current device connectivity' : 'Waiting for registered devices'}</p>
          <div className="signal-list">
             <div><span><i className="dot green" />Online</span><strong>{signal.online ?? '—'}</strong></div>
             <div><span><i className="dot amber" />Delayed</span><strong>{signal.delayed ?? '—'}</strong></div>
             <div><span><i className="dot red" />Offline</span><strong>{signal.offline ?? '—'}</strong></div>
          </div>
        </section>
      </div>
      <section className="panel activity-panel">
        <SectionHeading title="Today’s attendance activity" detail="Hourly scans from the live register" action={<Link href="/attendance" className="text-link">Open attendance →</Link>} />
         {recentAttendance.length ? <div className="activity-chart"><div className="chart-y"><span>High</span><span>Med</span><span>Low</span><span>0</span></div><div className="chart-body"><div className="chart-gridlines" />{activityBars(recentAttendance).map((height, index) => <div className="bar-wrap" key={index}><div className="bar" style={{ height: `${height}%` }} /><span>{String(index + 6).padStart(2, '0')}</span></div>)}</div></div> : <EmptyState icon="⌁" title="Attendance summary pending" message="The API has not supplied enough scan data to draw activity yet." />}
      </section>
    </>}
  </AppShell>;
}
