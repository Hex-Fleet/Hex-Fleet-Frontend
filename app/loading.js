export default function Loading() {
  return <div className="page-content">
    <div className="page-header">
      <div style={{ width: '100%' }}>
        <div className="skeleton skeleton-line" style={{ width: 120, height: 12 }} />
        <div className="skeleton skeleton-line" style={{ width: 320, height: 34, marginTop: 14 }} />
        <div className="skeleton skeleton-line" style={{ width: 420, height: 14, marginTop: 14 }} />
      </div>
    </div>
    <div className="metric-grid">
      {[0, 1, 2, 3].map((index) => <div className="skeleton" style={{ height: 152 }} key={index} />)}
    </div>
    <div className="dashboard-grid">
      <div className="skeleton" style={{ height: 320 }} />
      <div className="skeleton" style={{ height: 320 }} />
    </div>
  </div>;
}
