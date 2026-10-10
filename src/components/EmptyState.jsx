
import Icon from './Icon.jsx';

export default function EmptyState() {
  return (
    <div className="empty" role="status">
      <div className="empty__art" aria-hidden="true">
        <span className="confetti confetti--1" />
        <span className="confetti confetti--2" />
        <span className="confetti confetti--3" />
        <span className="confetti confetti--4" />
        <span className="confetti confetti--5" />
        <span className="confetti confetti--6" />
        <span className="empty__badge">
          <Icon name="check" size={24} />
        </span>
      </div>
      <p className="empty__title">All caught up!</p>
      <p className="empty__text">You&apos;ve completed all the available tasks.</p>
    </div>
  );
}
