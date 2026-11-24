import AppShell from '../../components/AppShell';
import { PageHeader } from '../../components/UI';
import { ApiErrorState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import RefreshButton from '../../components/RefreshButton';
import AdminRawTables from '../../components/AdminRawTables';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  try { const tables = await getDashboardData('/api/admin/raw-tables'); return <AppShell><PageHeader eyebrow="Administration" title="Raw data tables" description="Administrative view of the live microcontroller, sensor, and log tables." action={<RefreshButton />} /><AdminRawTables tables={tables || {}} /></AppShell>; } catch (error) { return <AppShell><PageHeader eyebrow="Administration" title="Raw data tables" description="Live PostgreSQL records." /><ApiErrorState error={error} /></AppShell>; }
}
