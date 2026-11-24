'use client';

// Route-level error boundary. Catches unexpected render/data errors that escape
// the per-page handling and offers a retry without a full reload.
export default function Error({ error, reset }) {
  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
  return <div className="app-frame">
    <div className="main-column">
      <main className="page-content">
        <div className="state-panel state-error" role="alert">
          <span className="state-icon" aria-hidden="true">⚠</span>
          <div className="state-copy">
            <strong>{isOffline ? 'You appear to be offline' : 'Something went wrong'}</strong>
            <p>{isOffline
              ? 'HexFleet could not reach the fleet API. Check your connection and retry.'
              : 'The dashboard hit an unexpected error while loading live data.'}</p>
            {error?.digest && <p className="state-hint">Reference: {error.digest}</p>}
          </div>
          <div className="state-actions">
            <button type="button" className="secondary-button" onClick={() => reset()}>Retry</button>
            <a className="text-link" href="/">Back to overview</a>
          </div>
        </div>
      </main>
    </div>
  </div>;
}
