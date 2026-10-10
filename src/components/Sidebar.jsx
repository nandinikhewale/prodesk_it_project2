
import Icon from './Icon.jsx';
import { SOCKET_URL } from '../lib/socket.js';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'grid', active: true },
  { label: 'Verification Tickets', icon: 'file' },
  { label: 'Activity Log', icon: 'clock' },
  { label: 'Settings', icon: 'gear' },
];

const SOCKET_LABELS = {
  connecting: 'WebSocket Connecting',
  open: 'WebSocket Connected',
  reconnecting: 'WebSocket Offline',
};

export default function Sidebar({ connection }) {
  return (
    <aside className="sidebar">
<<<<<<< HEAD
      <nav aria-label="Main">
        <ul className="nav">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`nav__link${item.active ? ' nav__link--active' : ''}`}
                aria-current={item.active ? 'page' : undefined}
                onClick={(event) => event.preventDefault()}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
=======

<nav aria-label="Main">
  <ul className="nav">
    {NAV_ITEMS.map((item) => (
      <li key={item.label}>
        {item.active ? (
          <a
            href="/"
            className="nav__link nav__link--active"
            aria-current="page"
          >
            <Icon name={item.icon} size={20} />
            {item.label}
          </a>
        ) : (
          <span className="nav__link nav__link--disabled">
            <Icon name={item.icon} size={20} />
            {item.label}
          </span>
        )}
      </li>
    ))}
  </ul>
</nav>

>>>>>>> bf73fd9 (Merge remote main with local project)

      <div className="socket-card">
        <div className="socket-card__row">
          <span className={`socket-card__dot socket-card__dot--${connection}`} aria-hidden="true" />
          <div>
            <p className="socket-card__title">{SOCKET_LABELS[connection]}</p>
            <p className="socket-card__text">{SOCKET_URL}</p>
          </div>
        </div>
        <div className="socket-card__row">
          <Icon name="bolt" size={18} className="socket-card__icon" />
          <div>
            <p className="socket-card__text">Real-time updates</p>
            <p className="socket-card__text socket-card__text--small">No page refresh required</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
