import { firestore } from './../../config';

export const getCategories = async (userId) => {
  const userRef = firestore.collection('transactions').doc(userId);

  return await userRef
    .get()
    .then((categories) => {
      if (categories.exists) {
        return categories.data().categories;
      } else {
        return 'No categories found';
      }
    })
    .catch((error) => {
      return `Error getting categories:", ${error}`;
    });
};

export const addCategories = async (userId, categories) => {
  return firestore
    .collection('transactions')
    .doc(userId)
    .set({ categories: categories })
    .then(() => {
      return 'Categories added';
    })
    .catch((error) => {
      return `Error adding categories:", ${error}`;
    });
};
