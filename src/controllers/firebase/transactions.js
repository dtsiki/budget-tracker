import { firestore } from './../../config';

export const addCustomCategories = async (userId, categories) => {
  return firestore
    .collection('transactions')
    .doc(userId)
    .set({ categories: categories });
};

export const getUserCustomCategories = async (userId) => {
  const userRef = firestore.collection('transactions').doc(userId);

  return await userRef
    .get()
    .then((categories) => {
      if (categories.exists) {
        return categories.data();
      } else {
        return 'No custom categories categories!';
      }
    })
    .catch((error) => {
      return `Error getting custom categories:", ${error}`;
    });
};

export const addTransaction = async (userId, data) => {
  return firestore
    .collection('transactions')
    .doc(userId)
    .collection(data.type)
    .add(data);
};

export const getTransactions = async (userId, type = 'expenses') => {
  let transactions = [];

  const snapshot = await firestore
    .collection('transactions')
    .doc(userId)
    .collection(type)
    .get();

  if (snapshot) {
    snapshot.forEach((doc) => {
      transactions.push(doc.data());
    });
  }

  return transactions;
};
