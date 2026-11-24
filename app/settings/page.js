import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading } from '../../components/UI';
import { ApiErrorState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import { BusManagement } from '../../components/FleetAdminForms';
import RefreshButton from '../../components/RefreshButton';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  try {
    const [devices, buses] = await Promise.all([getDashboardData('/api/dashboard/devices'), getDashboardData('/api/admin/buses')]);
    return <AppShell><PageHeader eyebrow="Workspace configuration" title="Settings" description="Configure the bus-to-controller fleet map from the live API." action={<RefreshButton />} /><section className="settings-grid"><div className="panel settings-card"><SectionHeading title="Device intervals" detail="The current API does not expose workspace settings." /><label>Health check interval <span>minutes</span><input defaultValue="10" readOnly aria-readonly="true" /></label><label>Telemetry interval <span>minutes</span><input defaultValue="1" readOnly aria-readonly="true" /></label><p className="muted-cell">These values are informational until the settings endpoint is available.</p></div><div className="panel settings-card"><SectionHeading title="Enabled signals" detail="Signal configuration is managed during controller registration." /><div className="toggle-row"><span><strong>GPS tracking</strong><small>Location and route movement</small></span><i className="toggle on" /></div><div className="toggle-row"><span><strong>Fuel telemetry</strong><small>A22 ultrasonic readings</small></span><i className="toggle on" /></div><div className="toggle-row"><span><strong>RFID attendance</strong><small>Instant scan ingestion</small></span><i className="toggle on" /></div></div></section><BusManagement devices={devices || []} buses={buses || []} /></AppShell>;
  } catch (error) { return <AppShell><PageHeader eyebrow="Workspace configuration" title="Settings" description="Configure the fleet workspace." /><ApiErrorState error={error} /></AppShell>; }
}
