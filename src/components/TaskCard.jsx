import React from 'react';
import Icon from './Icon.jsx';

const STATUS_LABELS = {
  IN_PROGRESS: 'In Progress',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

const OFFLINE_MESSAGE = 'Offline - Reconnecting...';

export default function TaskCard({ task, isOnline, onAction }) {
  const isPending = task.status === 'PENDING';
  const tooltipId = `offline-tip-${task.id}`;

  return (
    <li className="card">
      <div className="card__meta">
        <span className="card__code">#VT-{String(task.id).padStart(4, '0')}</span>
        <span className="card__time">
          <Icon name="clock" size={13} />
          {task.minutesAgo}m ago
        </span>
      </div>

      {/* Rendered as plain text so React escapes it; injected markup never runs. */}
      <h3 className="card__title">{task.title}</h3>
      <p className="card__description">{task.description}</p>

      {isPending ? (
        <>
          <span className="tag">{task.tag}</span>
          <div
            className={`card__actions${isOnline ? '' : ' card__actions--offline'}`}
            title={isOnline ? undefined : OFFLINE_MESSAGE}
          >
            <button
              type="button"
              className="btn btn--approve"
              disabled={!isOnline}
              aria-label={`Approve ${task.title}`}
              aria-describedby={isOnline ? undefined : tooltipId}
              onClick={() => onAction(task.id, 'APPROVED')}
            >
              <Icon name="check" size={14} />
              Approve
            </button>
            <button
              type="button"
              className="btn btn--reject"
              disabled={!isOnline}
              aria-label={`Reject ${task.title}`}
              aria-describedby={isOnline ? undefined : tooltipId}
              onClick={() => onAction(task.id, 'REJECTED')}
            >
              <Icon name="x" size={14} />
              Reject
            </button>
            {!isOnline && (
              <span id={tooltipId} role="tooltip" className="tooltip">
                {OFFLINE_MESSAGE}
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="card__footer">
          <span className="tag">{task.tag}</span>
          <span className={`status status--${task.status.toLowerCase()}`}>
            {STATUS_LABELS[task.status]}
          </span>
        </div>
      )}
    </li>
  );
}
