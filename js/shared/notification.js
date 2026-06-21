let isOpened = false;

const openNotification = () => {
  isOpened = true;
};

const closeNotification = () => {
  isOpened = false;
};

const isNotificationOpen = () => isOpened;

export {openNotification, closeNotification, isNotificationOpen};
