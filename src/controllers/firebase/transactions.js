import { firestore } from './../../config';
import defaultCategories from './../../constants/defaultCategories';

export const initTransactionsCollection = async (userId) => {
  return firestore
    .collection('transactions')
    .doc(userId)
    .set({ categories: defaultCategories, currency: 'RUB' })
    .then(() => {
      return 'User transactions collection has been initialized';
    })
    .catch((error) => {
      return `Error initialing transactions collection:", ${error}`;
    });
};

export const addTransaction = async (userId, data) => {
  return firestore
    .collection('transactions')
    .doc(userId)
    .collection(data.type)
    .add(data)
    .then(() => {
      return 'Transaction has been added successfully';
    })
    .catch((error) => {
      return `Error adding transactions:", ${error}`;
    });
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
