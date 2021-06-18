export const user = (store) => {
  store.on('@init', () => ({ user: { isLogin: false } }));

  store.on('user/login', ({ user }, obj) => {
    return {
      user: obj,
    };
  });

  store.on('user/logout', () => {
    return {
      user: { isLogin: false },
    };
  });
};
