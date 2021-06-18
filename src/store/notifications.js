export const notifications = (store) => {
  store.on('@init', () => ({ notifications: [] }));

  store.on('notifications/add', ({ notifications }, message) => {
    const notification = {
      message: message,
      id: Date.now(),
    };

    return { notifications: notifications.concat([notification]) };
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
