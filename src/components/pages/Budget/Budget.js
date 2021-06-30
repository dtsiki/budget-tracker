import React, { useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import { getTransactions } from './../../../controllers/firebase/transactions';
import Radio from './../../base/Radio';
import Transactions from './../../common/Transactions';

import './style.scss';

const Budget = () => {
  const { user } = useStoreon('user');
  const [type, setType] = useState('expenses');
  const [isInitializing, setInitializing] = useState({
    expenses: true,
    incomes: true,
  });
  const [transactions, setTransactions] = useState({
    expenses: [],
    incomes: [],
  });
  const [isLoaded, setLoaded] = useState({
    expenses: false,
    incomes: false,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setInitializing((prevInitializing) => ({
        ...prevInitializing,
        [type]: true,
      }));

      const result = await getTransactions(user.userId, type);

      if (result) {
        setTransactions((prevTransactions) => ({
          ...prevTransactions,
          [type]: result,
        }));
      }

      setInitializing((prevInitializing) => ({
        ...prevInitializing,
        [type]: false,
      }));

      setLoaded((prevLoaded) => ({
        ...prevLoaded,
        [type]: true,
      }));
    };

    if (!isLoaded[type]) fetchTransactions();
  }, [type]);

  const changeType = (e) => {
    setType(e.target.name);
  };

  const types = ['expenses', 'incomes'];

  const renderTypes = useMemo(() => {
    return types.map((typesItem) => {
      return (
        <Radio
          key={`type-${typesItem}`}
          wrapperClassName=""
          label={typesItem}
          value={typesItem}
          changeValue={changeType}
          name={typesItem}
          checked={type === typesItem}
        />
      );
    });
  }, [types]);

  return (
    <div>
      <h1>Budget</h1>
      <div className="flex">{renderTypes}</div>
      <div className="section">
        <h2>{type}</h2>
        {isInitializing[type] ? <div>Loading {type}</div> : <Transactions transactions={transactions[type]} />}
      </div>
    </div>
  );
};

export default Budget;
