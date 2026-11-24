import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading, StatusPill } from '../../components/UI';
import { ApiErrorState, EmptyState } from '../../components/ApiState';
import { formatDate, getDashboardData } from '../../lib/api';

export const dynamic = 'force-dynamic';

async function loadScans() {
  try {
    const [data, raw] = await Promise.all([getDashboardData('/api/dashboard/attendance'), getDashboardData('/api/admin/rfid-logs')]);
    return { scans: Array.isArray(data) ? data : [], rawLogs: Array.isArray(raw) ? raw : [], error: null };
  } catch (error) {
    return { scans: [], rawLogs: [], error: { kind: error?.kind, message: error?.message, status: error?.status } };
  }
}

export default async function AttendancePage() {
  const { scans, rawLogs, error } = await loadScans();
  return <AppShell>
    <PageHeader eyebrow="Live register" title="Attendance" description="Real-time RFID boarding activity from the HexFleet API." action={<button className="secondary-button" disabled title="Report download is not available yet">Download report</button>} />
    {error ? <ApiErrorState error={error} /> : <>
      <div className="attendance-banner">
        <div><span className="live-dot" /> Live scan stream</div>
        <strong>{scans.length} <small>recent scans</small></strong>
        <span className="banner-detail">Live from the HexFleet API</span>
      </div>
      <section className="panel">
        <SectionHeading title="Recent scans" detail="Latest records from the live attendance log" action={<button className="filter-button" disabled title="Filters are not available yet">All buses⌄</button>} />
        {scans.length ? <div className="data-table attendance-table">
          <div className="data-head"><span>Time</span><span>Student</span><span>Card UID</span><span>Vehicle</span><span>Result</span></div>
          {scans.map((scan) => <div className="data-row" key={scan.transId}>
            <strong className="mono">{formatDate(scan.scannedAt)}</strong>
            <span>{scan.student}</span>
            <span className="mono muted-cell">{scan.cardUid}</span>
            <span>{scan.bus}</span>
            <StatusPill tone={scan.status === 'SCANNED' ? 'green' : 'amber'}>{scan.status}</StatusPill>
          </div>)}
        </div> : <EmptyState icon="✓" title="No attendance scans yet" message="RFID scans will appear here as soon as a mapped controller sends them." />}
      </section>
      <section className="panel"><SectionHeading title="RFID reader logs" detail="Raw card events received from registered controllers" />{rawLogs.length ? <div className="data-table"><div className="data-head"><span>Scanned at</span><span>Card UID</span><span>Controller</span><span>Reader data</span></div>{rawLogs.map((log) => <div className="data-row" key={log.transId}><strong className="mono">{formatDate(log.scannedAt)}</strong><span className="mono">{log.cardUid}</span><span>{log.microcontroller?.name || log.microcontroller?.macAddress || 'Unknown'}</span><span className="muted-cell">Received</span></div>)}</div> : <EmptyState icon="⌁" title="No raw RFID logs yet" message="Raw reader events will appear here when a card is scanned." />}</section>
    </>}
  </AppShell>;
}
