import { faExclamation, faGrinWink, faHeartbeat, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { useStoreon } from 'storeon/react';

import './style.scss';

const Notifications = () => {
  const { notifications, dispatch } = useStoreon('notifications');

  const hideMessage = (id) => {
    dispatch('notifications/remove', id);
  };

  const typeIcons = {
    info: <FontAwesomeIcon icon={faGrinWink} />,
    error: <FontAwesomeIcon icon={faHeartbeat} />,
    warning: <FontAwesomeIcon icon={faExclamation} />,
  };

  const renderNotifications = useMemo(() => {
    if (!notifications.length) return;

    return notifications.map((notification) => {
      const { message, id, type } = notification;

      return (
        <div key={`notification-${message}-${id}`} className={`message message--${type}`}>
          {type !== 'default' && <span className="message-type">{typeIcons[type]}</span>}
          <div className="message__text">{message}</div>
          <button className="message-button" onClick={() => hideMessage(id)}>
            <span className="message-button__label">Remove</span>
            <span className="message-button__icon">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
      );
    });
  }, [notifications]);

  return <div className="notifications">{renderNotifications}</div>;
};

export default Notifications;
