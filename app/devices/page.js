import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading, StatusPill } from '../../components/UI';

const devices = [
  ['A4CF128B9E04', 'ESP32 Fleet Node', 'TN 99 Z 5641', 'Healthy', '42 sec ago', 'green'],
  ['867542081420', 'ESP32 Fleet Node', 'TN 38 AB 2109', 'Healthy', '1 min ago', 'green'],
  ['A4CF128B9E16', 'ESP32 Fleet Node', 'TN 37 C 8821', 'Healthy', '2 min ago', 'green'],
  ['A4CF128B9E22', 'ESP32 Fleet Node', 'TN 40 D 7004', 'Needs attention', '12 min ago', 'amber']
];

export default function DevicesPage() { return <AppShell><PageHeader eyebrow="Hardware registry" title="Devices" description="Every controller and sensor connected to HexFleet." action={<button className="primary-button">+ Register device</button>} /><section className="panel"><SectionHeading title="Registered controllers" detail="4 devices · 3 online" action={<button className="secondary-button">Export CSV</button>} /><div className="data-table"><div className="data-head"><span>MAC address</span><span>Device</span><span>Mapped bus</span><span>Last health check</span><span>Status</span></div>{devices.map((device) => <div className="data-row" key={device[0]}><strong className="mono">{device[0]}</strong><span>{device[1]}</span><span>{device[2]}</span><span className="muted-cell">{device[4]}</span><StatusPill tone={device[5]}>{device[3]}</StatusPill></div>)}</div></section><div className="info-strip"><span className="info-icon">i</span><div><strong>Device authentication is MAC-based</strong><p>Only registered and active controller MAC addresses can submit health, RFID, GPS, or fuel data.</p></div></div></AppShell>; }
