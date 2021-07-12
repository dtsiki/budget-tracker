import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Button from '../../base/Button';
import Checkbox from '../../base/Checkbox';
import Text from '../../base/Text';
import AddTransaction from './../../scenes/AddTransaction';

const Main = () => {
  const { userTransactions, userCategories, userCurrency } = useStoreon(
    'userTransactions',
    'userCategories',
    'userCurrency'
  );
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [currency, setCurrency] = useState(userCurrency);
  const [summary, setSummary] = useState({
    expenses: 0,
    incomes: 0,
  });
  const [showEmptyCategories, setShowEmptyCategories] = useState(false);

  useEffect(() => {
    const summaryExpenses = getSummary('expenses');

    setSummary((prevSummary) => ({
      ...prevSummary,
      expenses: summaryExpenses,
    }));
  }, [userTransactions, userCategories]);

  useEffect(() => {
    const summaryIncomes = getSummary('incomes');

    setSummary((prevSummary) => ({
      ...prevSummary,
      incomes: summaryIncomes,
    }));
  }, [userTransactions, userCategories]);

  const getSummary = (type) => {
    if (type === 'expenses' && !userCategories.expense && !userTransactions[type]) return;
    if (type === 'incomes' && !userCategories.income && !userTransactions[type]) return;

    const categories = type === 'expenses' ? userCategories.expense : userCategories.income;

    const categoriesSummary = categories.map((category) => {
      const categoryItems = userTransactions[type].filter((item) => item.category === category);

      const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.value);

      const categorySummary = categoryItems.reduce(reducer, 0);
      return categorySummary;
    });

    return categoriesSummary.reduce((accumulator, currentValue) => accumulator + currentValue);
  };

  const renderCategories = useCallback(
    (type) => {
      if (type === 'expenses' && !userCategories.expense && !userTransactions[type]) return;
      if (type === 'incomes' && !userCategories.income && !userTransactions[type]) return;

      const categories = type === 'expenses' ? userCategories.expense : userCategories.income;

      return categories.map((category) => {
        const categoryItems = userTransactions[type].filter((item) => item.category === category);

        const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.value);
        const categorySummary = categoryItems.reduce(reducer, 0);

        if (categoryItems.length) {
          const categorySummaryLabel = `${categorySummary} ${currency}`;
          const categoryPercentage = `${Math.round((categorySummary * 100) / summary[type])}%`;

          return (
            <div key={`${category}-${type}`} className="group">
              <h3>
                {category} ({categorySummaryLabel}/{categoryPercentage})
              </h3>
              <ul className="list">
                {categoryItems.map((item) => {
                  return (
                    <li key={`${type}-${item.description}-${item.date}-${item.value}`} className="list__item">
                      {item.description} {item.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        } else {
          if (showEmptyCategories) {
            return (
              <div className="group" key={`empty-${category}`}>
                <h3>{category}</h3>
                <Text>No expenses</Text>
              </div>
            );
          } else return;
        }
      });
    },
    [userCategories, userTransactions, summary, showEmptyCategories]
  );

  const renderTransactionsByCategories = useCallback(
    (type) => {
      const sign = type === 'incomes' ? '+' : '-';

      return (
        <div className="section">
          <h2>{type} by categories</h2>
          <h3>
            Summary: {sign}
            {summary[type]} {currency}/100%
          </h3>
          {renderCategories(type)}
        </div>
      );
    },
    [userCategories, userTransactions, summary, showEmptyCategories]
  );

  const toggleTransaction = () => {
    setShowTransactionForm((showTransactionForm) => !showTransactionForm);
  };

  const toggleEmptyCategories = () => {
    setShowEmptyCategories((showEmptyCategories) => !showEmptyCategories);
  };

  return (
    <div>
      <h1>Main</h1>
      <Checkbox
        name="emptyCategoriesToggle"
        value={showEmptyCategories}
        onChange={toggleEmptyCategories}
        label={`${showEmptyCategories ? 'Hide' : 'Show'} empty categories`}
      />
      {renderTransactionsByCategories('expenses')}
      {renderTransactionsByCategories('incomes')}
      <div>
        <Button variant={showTransactionForm ? `secondary` : 'primary'} onClick={toggleTransaction}>
          {showTransactionForm ? `Hide` : `Add transaction`}
        </Button>
        {showTransactionForm && <AddTransaction />}
      </div>
    </div>
  );
};

export default Main;
