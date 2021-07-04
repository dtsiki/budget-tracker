import React, { useMemo, useState } from 'react';
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

  const renderExpenses = useMemo(() => {
    return userCategories.expense.map((category) => {
      const categoryExpenses = userTransactions.expenses.filter((expense) => expense.category === category);

      const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.value);
      const categorySummary = categoryExpenses.reduce(reducer, 0);

      if (categoryExpenses.length) {
        return (
          <div key={`${category}-expenses`} className="group">
            <h3>
              {category} ({categorySummary})
            </h3>
            <ul className="list">
              {categoryExpenses.map((expense) => {
                return (
                  <li key={`expense-${expense.description}-${expense.date}-${expense.value}`} className="list__item">
                    {expense.description} {expense.value}
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
  }, [userTransactions, userCategories]);

  return (
    <div>
      <h1>Main</h1>
      <div className="section">
        <h2>Expenses by categories</h2>
        {renderExpenses}
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
