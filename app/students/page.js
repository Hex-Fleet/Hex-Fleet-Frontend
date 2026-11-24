import AppShell from '../../components/AppShell';
import { MetricCard, PageHeader, SectionHeading } from '../../components/UI';
import { ApiErrorState, EmptyState } from '../../components/ApiState';
import { getDashboardData } from '../../lib/api';
import { StudentForm } from '../../components/FleetAdminForms';

export const dynamic = 'force-dynamic';

export default async function StudentsPage() {
  try {
    const students = (await getDashboardData('/api/dashboard/students')) || [];
    const mapped = students.filter((student) => student.rfidMappings?.length).length;
    return <AppShell><PageHeader eyebrow="People & identity" title="Students" description="Live student records and RFID identities from PostgreSQL." action={<StudentForm />} /><div className="metric-grid three"><MetricCard label="Total students" value={students.length} detail="Active records" /><MetricCard label="RFID mapped" value={mapped} detail={students.length ? `${Math.round((mapped / students.length) * 100)}% coverage` : 'No records yet'} accent="violet" /><MetricCard label="Unmapped students" value={Math.max(students.length - mapped, 0)} detail="Needs review" accent="orange" /></div><section className="panel"><SectionHeading title="Student directory" detail={`${students.length} live records`} action={<button className="secondary-button">Search students</button>} />{students.length ? <div className="data-table"><div className="data-head"><span>Student ID</span><span>Name</span><span>Class</span><span>RFID card</span><span>Status</span></div>{students.map((student) => <div className="data-row" key={student.transId}><strong className="mono">{student.admissionNo || student.transId.slice(0, 8)}</strong><span>{student.firstName} {student.lastName || ''}</span><span>{student.className || '—'}</span><span className="mono muted-cell">{student.rfidMappings?.[0]?.cardUid || 'Not mapped'}</span><span className="text-green">Active</span></div>)}</div> : <EmptyState icon="◌" title="No students in the live database" message="Create student records to see them here." />}</section></AppShell>;
  } catch (error) { return <AppShell><PageHeader eyebrow="People & identity" title="Students" description="Live student records and RFID identities from PostgreSQL." action={<StudentForm />} /><ApiErrorState error={error} /></AppShell>; }
}
