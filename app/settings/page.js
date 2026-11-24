import AppShell from '../../components/AppShell';
import { PageHeader, SectionHeading } from '../../components/UI';
import { API_BASE_URL } from '../../lib/api';

export const metadata = { title: 'Settings · HexFleet' };

export default function SettingsPage() {
  return <AppShell>
    <PageHeader eyebrow="Workspace configuration" title="Settings" description="Workspace settings are served by the HexFleet API." />
    <section className="settings-grid">
      <div className="panel settings-card">
        <SectionHeading title="Backend API" detail="Source of all live dashboard data" />
        <label>API host <span>read-only</span><input readOnly value={API_BASE_URL} /></label>
        <p className="muted-cell">Configured with <code className="mono">NEXT_PUBLIC_API_URL</code>. Change it in the Vercel project environment, then redeploy.</p>
      </div>
      <div className="panel settings-card">
        <SectionHeading title="Device configuration" detail="Managed by the backend" />
        <div className="live-empty">
          <span>⚙</span>
          <strong>No settings endpoint available yet</strong>
          <p>The current API does not expose a settings endpoint, so there are no editable values to show here.</p>
        </div>
      </div>
    </section>
  </AppShell>;
}
