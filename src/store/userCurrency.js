import defaultCurrencies from './../constants/defaultCurrencies';

export const userCurrency = (store) => {
  store.on('@init', () => ({ userCurrency: defaultCurrencies[0] }));

  store.on('userCurrency/update', ({ userCurrency }, currency) => {
    return {
      userCurrency: currency,
    };
  });
};
