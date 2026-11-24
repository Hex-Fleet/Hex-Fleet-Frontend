import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading, StatusPill } from '../../components/UI';
import { ApiErrorState, EmptyState } from '../../components/ApiState';
import { formatDate, getDashboardData } from '../../lib/api';
import DeviceRegistrationModal from '../../components/DeviceRegistrationModal';
import RefreshButton from '../../components/RefreshButton';

export const dynamic = 'force-dynamic';

async function loadDevices() {
  try {
    const data = await getDashboardData('/api/dashboard/devices');
    return { devices: Array.isArray(data) ? data : [], error: null };
  } catch (error) {
    return { devices: [], error: { kind: error?.kind, message: error?.message, status: error?.status } };
  }
}

export default async function DevicesPage() {
  const { devices, error } = await loadDevices();
  return <AppShell>
    <PageHeader eyebrow="Hardware registry" title="Devices" description="Live controllers and sensors from the HexFleet API. Times shown in IST (UTC+05:30)." action={<div className="header-actions"><RefreshButton /><DeviceRegistrationModal /></div>} />
    <section className="panel">
      <SectionHeading title="Registered controllers" detail={`${devices.length} device${devices.length === 1 ? '' : 's'} from the live API`} action={<button className="secondary-button" disabled title="Export is not available yet">Export CSV</button>} />
      {error ? <ApiErrorState error={error} /> : devices.length ? <div className="data-table">
        <div className="data-head"><span>MAC address</span><span>Device</span><span>Mapped bus</span><span>Last health check</span><span>Status</span></div>
        {devices.map((device) => <div className="data-row" key={device.transId}>
          <strong className="mono">{device.macAddress}</strong>
          <span>{device.name || device.model || 'ESP32 Fleet Node'}</span>
          <span>{device.bus || 'Unmapped'}</span>
          <span className="muted-cell">{formatDate(device.lastHealthCheckTime)}</span>
          <StatusPill tone={device.online ? 'green' : 'red'}>{device.online ? 'Online' : 'Offline'}</StatusPill>
        </div>)}
      </div> : <EmptyState icon="⌁" title="No registered controllers" message="The live database has no microcontroller rows yet." />}
    </section>
    <div className="info-strip"><span className="info-icon">i</span><div><strong>Device authentication is MAC-based</strong><p>Only registered and active controller MAC addresses can submit health, RFID, GPS, or fuel data.</p></div></div>
  </AppShell>;
}
