
const LABELS = {
  connecting: 'Connecting…',
  open: 'Connected',
  reconnecting: 'Offline - Reconnecting...',
};

export default function ConnectionStatus({ state, retryInSeconds }) {
  return (
    <p className={`connection connection--${state}`} role="status" aria-live="polite">
      <span className="connection__dot" aria-hidden="true" />
      <span>{LABELS[state]}</span>
      {state === 'reconnecting' && retryInSeconds !== null && (
        <span className="connection__retry">({retryInSeconds}s)</span>
      )}
    </p>
  );
}
