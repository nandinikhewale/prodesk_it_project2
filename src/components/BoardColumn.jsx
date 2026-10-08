import React from 'react';
import Icon from './Icon.jsx';
import TaskCard from './TaskCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function BoardColumn({ id, title, icon, tasks, isOnline, onAction, showEmptyState }) {
  const headingId = `column-${id}`;

  return (
    <section className={`column column--${id}`} aria-labelledby={headingId}>
      <div className="column__header">
        <span className="column__icon">
          <Icon name={icon} size={18} />
        </span>
        <h2 id={headingId} className="column__title">
          {title}
        </h2>
        <span className="column__count" aria-label={`${tasks.length} tickets`}>
          {tasks.length}
        </span>
      </div>

      {tasks.length > 0 && (
        <ul className="column__list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} isOnline={isOnline} onAction={onAction} />
          ))}
        </ul>
      )}

      {tasks.length === 0 && !showEmptyState && <p className="column__empty">No tickets here.</p>}

      {showEmptyState && <EmptyState />}
    </section>
  );
}
