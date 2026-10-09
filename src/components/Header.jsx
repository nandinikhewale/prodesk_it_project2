import React from 'react';
import Icon from './Icon.jsx';
import ConnectionStatus from './ConnectionStatus.jsx';

export default function Header({ connection, retryInSeconds }) {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand__logo">
          <Icon name="shield" size={30} />
        </span>
        <h1 className="brand__name">Real-Time Verification Portal</h1>
      </div>

      <div className="header__right">
        <div className="header__room">
          <ConnectionStatus state={connection} retryInSeconds={retryInSeconds} />
          <span className="header__divider" aria-hidden="true" />
          <span className="header__room-name">Operations Room</span>
        </div>

        <div className="profile">
          <span className="profile__avatar">
            <Icon name="user" size={20} />
          </span>
          <span className="profile__text">
            <span className="profile__name">Nandini Khewale</span>
            <span className="profile__role">Field Operator</span>
          </span>
          <Icon name="chevron" size={16} className="profile__chevron" />
        </div>
      </div>
    </header>
  );
}
