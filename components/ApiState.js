import RetryButton from './RetryButton';

const ERROR_COPY = {
  offline: {
    icon: '⚠',
    title: 'The fleet API is unreachable',
    body: 'HexFleet could not connect to the backend API. Check the API host and your network connection, then retry.'
  },
  http: {
    icon: '⚠',
    title: 'The fleet API returned an error',
    body: 'The backend API responded, but not with the data HexFleet expected. Please retry in a moment.'
  },
  invalid: {
    icon: '⚠',
    title: 'Unexpected API response',
    body: 'The backend API returned a response HexFleet could not read.'
  }
};

// Renders an API failure (offline / HTTP error / invalid response) with a retry.
export function ApiErrorState({ error }) {
  const kind = error?.kind || 'http';
  const copy = ERROR_COPY[kind] || ERROR_COPY.http;
  return <div className="state-panel state-error" role="alert">
    <span className="state-icon" aria-hidden="true">{copy.icon}</span>
    <div className="state-copy">
      <strong>{copy.title}</strong>
      <p>{error?.message || copy.body}</p>
      {kind !== 'offline' && error?.message ? <p className="state-hint">{copy.body}</p> : null}
    </div>
    <div className="state-actions"><RetryButton /></div>
  </div>;
}

// Renders a "no records yet" state for a live endpoint that returned an empty set.
export function EmptyState({ icon = '◌', title, message, action }) {
  return <div className="live-empty"><span>{icon}</span><strong>{title}</strong>{message && <p>{message}</p>}{action}</div>;
}
