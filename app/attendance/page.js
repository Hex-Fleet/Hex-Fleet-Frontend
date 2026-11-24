import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading, StatusPill } from '../../components/UI';
import { formatDate, getDashboardData } from '../../lib/api';

export const dynamic = 'force-dynamic';

export default async function AttendancePage() {
  const scans = await getDashboardData('/api/dashboard/attendance', []);
  return <AppShell><PageHeader eyebrow="Live register" title="Attendance" description="Real-time RFID boarding activity from the live attendance log." action={<button className="secondary-button">Download report</button>} /><div className="attendance-banner"><div><span className="live-dot" /> Live scan stream</div><strong>{scans.length} <small>recent scans</small></strong><span className="banner-detail">Read from PostgreSQL</span></div><section className="panel"><SectionHeading title="Recent scans" detail="Latest records from tbl_student_attendance_logs" action={<button className="filter-button">All buses⌄</button>} />{scans.length ? <div className="data-table attendance-table"><div className="data-head"><span>Time</span><span>Student</span><span>Card UID</span><span>Vehicle</span><span>Result</span></div>{scans.map((scan) => <div className="data-row" key={scan.transId}><strong className="mono">{formatDate(scan.scannedAt)}</strong><span>{scan.student}</span><span className="mono muted-cell">{scan.cardUid}</span><span>{scan.bus}</span><StatusPill tone={scan.status === 'SCANNED' ? 'green' : 'amber'}>{scan.status}</StatusPill></div>)}</div> : <div className="live-empty"><span>✓</span><strong>No attendance scans yet</strong><p>RFID scans will appear here as soon as a mapped controller sends them.</p></div>}</section></AppShell>;
}
