export const userTransactions = (store) => {
  store.on('@init', () => ({ userTransactions: [] }));

  store.on('userTransactions/addExpenses', ({ userTransactions }, expenses) => {
    return {
      userTransactions: {
        ...userTransactions,
        expenses: expenses,
      },
    };
  });

  store.on('userTransactions/addIncomes', ({ userTransactions }, incomes) => {
    return {
      userTransactions: {
        ...userTransactions,
        incomes: incomes,
      },
    };
  });
};
