import AppShell from '../../components/AppShell';
import { PageHeader } from '../../components/UI';
import { ApiErrorState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import DeviceRegistrationModal from '../../components/DeviceRegistrationModal';
import RefreshButton from '../../components/RefreshButton';
import PaginatedList from '../../components/PaginatedList';

export const dynamic = 'force-dynamic';
export default async function DevicesPage() {
  try { const devices = (await getDashboardData('/api/dashboard/devices')) || []; return <AppShell><PageHeader eyebrow="Hardware registry" title="Devices" description="Live controllers and sensors from the HexFleet API. Times shown in IST (UTC+05:30)." action={<div className="header-actions"><RefreshButton /><DeviceRegistrationModal /></div>} /><section className="panel"><h2>Registered controllers</h2><p className="section-detail">{devices.length} live device{devices.length === 1 ? '' : 's'}</p><PaginatedList rows={devices} type="devices" /></section><div className="info-strip"><span className="info-icon">i</span><div><strong>Device authentication is MAC-based</strong><p>Only registered and active controller MAC addresses can submit health, RFID, GPS, or fuel data.</p></div></div></AppShell>; } catch (error) { return <AppShell><PageHeader eyebrow="Hardware registry" title="Devices" description="Live controllers and sensors from the HexFleet API." /><ApiErrorState error={error} /></AppShell>; }
}
