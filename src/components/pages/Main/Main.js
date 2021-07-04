import React, { useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Button from '../../base/Button';
import Text from '../../base/Text';
import Categories from './../../common/Categories';
import AddTransaction from './../../scenes/AddTransaction';

const Main = () => {
  const { userTransactions, userCategories } = useStoreon('user', 'userTransactions', 'userCategories');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [type, setType] = useState('expenses');

  const toggleTransaction = () => {
    setShowTransactionForm((showTransactionForm) => !showTransactionForm);
  };

  const toggleCategories = () => {
    setShowCategories((showCategories) => !showCategories);
  };

  const renderExpenses = useMemo(() => {
    return userCategories.expense.map((category) => {
      const categoryExpenses = userTransactions.expenses.filter((expense) => expense.category === category);

      if (categoryExpenses.length) {
        return (
          <div key={`${category}-expenses`} className="group">
            <h3>{category}</h3>
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
    </div>
  );
};

export default Main;
