import AppShell from '../../components/AppShell';
import { PageHeader } from '../../components/UI';
import { ApiErrorState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import RefreshButton from '../../components/RefreshButton';
import PaginatedList from '../../components/PaginatedList';

export const dynamic = 'force-dynamic';
export default async function AttendancePage() {
  try { const scans = (await getDashboardData('/api/dashboard/attendance')) || []; return <AppShell><PageHeader eyebrow="Live register" title="Attendance" description="Real-time RFID boarding activity from the HexFleet API." action={<div className="header-actions"><RefreshButton /><button className="secondary-button" disabled>Download report</button></div>} /><div className="attendance-banner"><div><span className="live-dot" /> Live scan stream</div><strong>{scans.length} <small>recent scans</small></strong><span className="banner-detail">Live from the HexFleet API</span></div><section className="panel"><h2>Recent scans</h2><p className="section-detail">Search, filter, and page through attendance records</p><PaginatedList rows={scans} type="attendance" /></section></AppShell>; } catch (error) { return <AppShell><PageHeader eyebrow="Live register" title="Attendance" description="Real-time RFID boarding activity from the HexFleet API." /><ApiErrorState error={error} /></AppShell>; }
}
