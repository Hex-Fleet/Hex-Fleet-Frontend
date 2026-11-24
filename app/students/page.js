import AppShell from '../../components/AppShell';
import { MetricCard, PageHeader } from '../../components/UI';
import { ApiErrorState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import { StudentForm } from '../../components/FleetAdminForms';
import RefreshButton from '../../components/RefreshButton';
import PaginatedList from '../../components/PaginatedList';

export const dynamic = 'force-dynamic';
export default async function StudentsPage() {
  try { const students = (await getDashboardData('/api/dashboard/students')) || []; const mapped = students.filter((student) => student.rfidMappings?.length).length; return <AppShell><PageHeader eyebrow="People & identity" title="Students" description="Live student records and RFID identities from the HexFleet API." action={<div className="header-actions"><RefreshButton /><StudentForm /></div>} /><div className="metric-grid three"><MetricCard label="Total students" value={students.length} detail="Active records" /><MetricCard label="RFID mapped" value={mapped} detail={students.length ? `${Math.round((mapped / students.length) * 100)}% coverage` : 'No records yet'} accent="violet" /><MetricCard label="Unmapped students" value={Math.max(students.length - mapped, 0)} detail="Needs review" accent="orange" /></div><section className="panel"><h2>Student directory</h2><p className="section-detail">Search and page through live student records</p><PaginatedList rows={students} type="students" /></section></AppShell>; } catch (error) { return <AppShell><PageHeader eyebrow="People & identity" title="Students" description="Live student records from the HexFleet API." action={<StudentForm />} /><ApiErrorState error={error} /></AppShell>; }
}
