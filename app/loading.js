import AppShell from '../components/AppShell';

export default function Loading() {
  return <AppShell><div className="page-loading" aria-busy="true" aria-label="Loading page">
    <div className="skeleton loading-eyebrow" />
    <div className="skeleton loading-title" />
    <div className="skeleton loading-description" />
    <div className="loading-grid"><div className="skeleton loading-card" /><div className="skeleton loading-card" /><div className="skeleton loading-card" /></div>
    <div className="skeleton loading-panel" />
  </div></AppShell>;
}
