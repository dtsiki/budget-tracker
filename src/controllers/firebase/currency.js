import { firestore } from './../../config';

export const getCurrency = async (userId) => {
  const userRef = firestore.collection('transactions').doc(userId);

  return await userRef
    .get()
    .then((currency) => {
      if (currency.exists) {
        return currency.data().currency;
      } else {
        return 'No currency found';
      }
    })
    .catch((error) => {
      return `Error getting currency:", ${error}`;
    });
};

export const updateCurrency = async (userId, currency) => {
  return firestore
    .collection('transactions')
    .doc(userId)
    .set({ currency: currency }, { merge: true })
    .then(() => {
      return 'Currency updated';
    })
    .catch((error) => {
      return `Error updating currency:", ${error}`;
    });
};
