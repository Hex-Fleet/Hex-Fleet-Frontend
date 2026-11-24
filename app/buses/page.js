import AppShell from '../../components/AppShell';
import { PageHeader } from '../../components/UI';
import { ApiErrorState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import RefreshButton from '../../components/RefreshButton';
import { BusManagement } from '../../components/FleetAdminForms';
import PaginatedList from '../../components/PaginatedList';

export const dynamic = 'force-dynamic';
export default async function BusesPage() {
  try { const [buses, devices] = await Promise.all([getDashboardData('/api/dashboard/buses'), getDashboardData('/api/dashboard/devices')]); return <AppShell><PageHeader eyebrow="Fleet management" title="Buses" description="Create fleet buses and connect each one to its registered ESP32 controller." action={<RefreshButton />} /><BusManagement devices={devices || []} buses={buses || []} /><section className="panel"><h2>Fleet buses</h2><p className="section-detail">{buses?.length || 0} live buses</p><PaginatedList rows={buses || []} type="buses" /></section></AppShell>; } catch (error) { return <AppShell><PageHeader eyebrow="Fleet management" title="Buses" description="Fleet buses from the live API." /><ApiErrorState error={error} /></AppShell>; }
}
