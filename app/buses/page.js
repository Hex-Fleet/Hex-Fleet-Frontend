import Link from 'next/link';
import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading, StatusPill } from '../../components/UI';
import { ApiErrorState, EmptyState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import RefreshButton from '../../components/RefreshButton';
import { BusManagement } from '../../components/FleetAdminForms';

export const dynamic = 'force-dynamic';

export default async function BusesPage() {
  try {
    const [buses, devices] = await Promise.all([getDashboardData('/api/dashboard/buses'), getDashboardData('/api/dashboard/devices')]);
    return <AppShell><PageHeader eyebrow="Fleet management" title="Buses" description="Create fleet buses and connect each one to its registered ESP32 controller." action={<RefreshButton />} /><BusManagement devices={devices || []} buses={buses || []} /><section className="panel"><SectionHeading title="Fleet buses" detail={`${buses?.length || 0} live buses`} />{buses?.length ? <div className="data-table"><div className="data-head"><span>Bus</span><span>Registration</span><span>Controller</span><span>Signal</span><span>Open</span></div>{buses.map((bus) => <div className="data-row" key={bus.transId}><strong>{bus.busNumber}</strong><span>{bus.registrationNo || '—'}</span><span className="mono">{bus.controller?.macAddress || 'Unmapped'}</span><StatusPill tone={bus.controller?.online ? 'green' : 'red'}>{bus.controller?.online ? 'Online' : 'Offline'}</StatusPill><Link className="text-link" href={`/buses/${bus.transId}`}>View bus →</Link></div>)}</div> : <EmptyState icon="▣" title="No buses created" message="Create a bus above and map it to a controller." />}</section></AppShell>;
  } catch (error) { return <AppShell><PageHeader eyebrow="Fleet management" title="Buses" description="Fleet buses from the live API." /><ApiErrorState error={error} /></AppShell>; }
}
