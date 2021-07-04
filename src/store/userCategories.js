import defaultCategories from './../constants/defaultCategories';

export const userCategories = (store) => {
  store.on('@init', () => ({ userCategories: defaultCategories }));

  store.on('userCategories/add', ({ userCategories }, categories) => {
    return {
      userCategories: categories,
    };
  });
};
