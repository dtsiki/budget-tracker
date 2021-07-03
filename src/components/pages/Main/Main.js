import React, { useState } from 'react';

import Button from '../../base/Button';
import Categories from './../../common/Categories';
import AddTransaction from './../../scenes/AddTransaction';

const Main = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const toggleTransaction = () => {
    setShowTransactionForm((showTransactionForm) => !showTransactionForm);
  };

  const toggleCategories = () => {
    setShowCategories((showCategories) => !showCategories);
  };

  return (
    <div>
      <h1>Main</h1>
      <div>
        <Button onClick={toggleCategories}>{showCategories ? `Hide categories` : `Manage categories`}</Button>
        {showCategories && <Categories />}
      </div>
      <div>
        <Button onClick={toggleTransaction}>{showTransactionForm ? `Hide` : `Add transaction`}</Button>
        {showTransactionForm && <AddTransaction />}
      </div>
    </div>
  );
};

export default Main;
