import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Button from '../../base/Button';
import Radio from '../../base/Radio';
import defaultCurrencies from './../../../constants/defaultCurrencies';
import { updateCurrency } from './../../../controllers/firebase/currency';
import Dropdown from './../../base/Dropdown';
import Categories from './../../common/Categories';
import AddTransaction from './../../scenes/AddTransaction';

const Main = () => {
  const { userTransactions, userCategories, userCurrency, user, dispatch } = useStoreon(
    'user',
    'userTransactions',
    'userCategories',
    'userCurrency'
  );
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [type, setType] = useState('expenses');
  const [currency, setCurrency] = useState(userCurrency);
  const [summary, setSummary] = useState({
    expenses: 0,
    incomes: 0,
  });

  const toggleTransaction = () => {
    setShowTransactionForm((showTransactionForm) => !showTransactionForm);
  };

  const toggleCategories = () => {
    setShowCategories((showCategories) => !showCategories);
  };

  const selectCurrency = async (currency) => {
    const result = await updateCurrency(user.userId, currency);

    dispatch('notifications/add', result);

    setCurrency(currency);
  };

  const renderСurrencies = useMemo(() => {
    return defaultCurrencies.map((defaultCurrency) => {
      return (
        <Radio
          key={`currency-${defaultCurrency}`}
          wrapperClassName=""
          label={defaultCurrency}
          value={defaultCurrency}
          name={defaultCurrency}
          checked={currency === defaultCurrency}
          changeValue={() => selectCurrency(defaultCurrency)}
        />
      );
    });
  }, [defaultCurrencies, currency]);

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
          const categorySummaryLabel = `${type === 'expenses' ? '-' : '+'}${categorySummary} ${currency}`;
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
        } else return;
        /*
          return (
            <div className="group">
              <h3>{category}</h3>
              <Text>No expenses</Text>
            </div>
          );
        */
      });
    },
    [userCategories, userTransactions]
  );

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

  return (
    <div>
      <h1>Main</h1>
      <div className="section">
        <h2>Expenses by categories</h2>
        <h3>
          Summary: -{summary.expenses} {currency}/100%
        </h3>
        {renderCategories('expenses')}
      </div>
      <div className="section">
        <h2>Incomes by categories</h2>
        <h3>
          Summary: +{summary.incomes} {currency}/100%
        </h3>
        {renderCategories('incomes')}
      </div>
      <div>
        <Button variant={showCategories ? `secondary` : 'primary'} onClick={toggleCategories}>
          {showCategories ? `Hide categories` : `Manage categories`}
        </Button>
        {showCategories && <Categories />}
      </div>
      <div>
        <Button variant={showTransactionForm ? `secondary` : 'primary'} onClick={toggleTransaction}>
          {showTransactionForm ? `Hide` : `Add transaction`}
        </Button>
        {showTransactionForm && <AddTransaction />}
      </div>
      <div className="section">
        <h2>Manage currency</h2>
        <Dropdown label={`Currency (${currency})`} items={renderСurrencies} />
      </div>
    </div>
  );
};

export default Main;
