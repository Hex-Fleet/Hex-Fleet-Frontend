import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading } from '../../components/UI';
import { ApiErrorState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import { BusManagement } from '../../components/FleetAdminForms';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  try {
    const [devices, buses] = await Promise.all([getDashboardData('/api/dashboard/devices'), getDashboardData('/api/admin/buses')]);
    return <AppShell><PageHeader eyebrow="Workspace configuration" title="Settings" description="Configure signals, reporting intervals, and the bus-to-controller fleet map." /><section className="settings-grid"><div className="panel settings-card"><SectionHeading title="Device intervals" detail="Configured per controller during registration" /><label>Health check interval <span>minutes</span><input defaultValue="10" /></label><label>Telemetry interval <span>minutes</span><input defaultValue="1" /></label><p className="muted-cell">The ESP32 receives these values during its startup health check.</p></div><div className="panel settings-card"><SectionHeading title="Enabled signals" detail="Selected on each controller registration" /><div className="toggle-row"><span><strong>GPS tracking</strong><small>Location and route movement</small></span><i className="toggle on" /></div><div className="toggle-row"><span><strong>Fuel telemetry</strong><small>A22 ultrasonic readings</small></span><i className="toggle on" /></div><div className="toggle-row"><span><strong>RFID attendance</strong><small>Instant scan ingestion</small></span><i className="toggle on" /></div></div></section><BusManagement devices={devices || []} buses={buses || []} /></AppShell>;
  } catch (error) { return <AppShell><PageHeader eyebrow="Workspace configuration" title="Settings" description="Configure the fleet workspace." /><ApiErrorState error={error} /></AppShell>; }
}
