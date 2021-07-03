export const notifications = (store) => {
  store.on('@init', () => ({ notifications: [] }));

  store.on('notifications/add', ({ notifications }, message) => {
    return addNotification(notifications, message);
  });

  store.on('notifications/info', ({ notifications }, message) => {
    return addNotification(notifications, message, 'info');
  });

  store.on('notifications/error', ({ notifications }, message) => {
    return addNotification(notifications, message, 'error');
  });

  store.on('notifications/warning', ({ notifications }, message) => {
    return addNotification(notifications, message, 'warning');
  });

  store.on('notifications/remove', ({ notifications }, id) => {
    const updatedNotifications = notifications.filter((notification) => {
      return notification.id !== id;
    });

    return {
      notifications: updatedNotifications,
    };
  });
};

const addNotification = (notifications, message, type = 'default') => {
  const notification = {
    type: type,
    message: message,
    id: Date.now(),
  };

  return { notifications: notifications.concat([notification]) };
};
