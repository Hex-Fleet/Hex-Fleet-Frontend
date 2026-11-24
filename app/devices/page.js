import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading, StatusPill } from '../../components/UI';
import { formatDate, getDashboardData } from '../../lib/api';

export const dynamic = 'force-dynamic';

export default async function DevicesPage() {
  const devices = await getDashboardData('/api/dashboard/devices', []);
  return <AppShell><PageHeader eyebrow="Hardware registry" title="Devices" description="Live controllers and sensors registered in PostgreSQL." action={<button className="primary-button">+ Register device</button>} /><section className="panel"><SectionHeading title="Registered controllers" detail={`${devices.length} device${devices.length === 1 ? '' : 's'} from the live API`} action={<button className="secondary-button">Export CSV</button>} />{devices.length ? <div className="data-table"><div className="data-head"><span>MAC address</span><span>Device</span><span>Mapped bus</span><span>Last health check</span><span>Status</span></div>{devices.map((device) => <div className="data-row" key={device.transId}><strong className="mono">{device.macAddress}</strong><span>{device.name || device.model || 'ESP32 Fleet Node'}</span><span>{device.bus || 'Unmapped'}</span><span className="muted-cell">{formatDate(device.lastHealthCheckTime)}</span><StatusPill tone={device.online ? 'green' : 'red'}>{device.online ? 'Online' : 'Offline'}</StatusPill></div>)}</div> : <div className="live-empty"><span>⌁</span><strong>No registered controllers</strong><p>The live database has no microcontroller rows yet.</p></div>}</section><div className="info-strip"><span className="info-icon">i</span><div><strong>Device authentication is MAC-based</strong><p>Only registered and active controller MAC addresses can submit health, RFID, GPS, or fuel data.</p></div></div></AppShell>;
}
