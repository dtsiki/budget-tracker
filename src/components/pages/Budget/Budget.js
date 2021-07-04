import React, { useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import transactionTypes from './../../../constants/transactionTypes';
import Loader from './../../base/Loader';
import Radio from './../../base/Radio';
import Transactions from './../../common/Transactions';

import './style.scss';

const Budget = () => {
  const { userTransactions } = useStoreon('user', 'userTransactions');
  const [type, setType] = useState('expenses');
  const [transactions, setTransactions] = useState({
    expenses: [],
    incomes: [],
  });
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userTransactions) {
      setTransactions(userTransactions);
      setLoaded(true);
    }
  }, [userTransactions]);

  const changeType = (e) => {
    setType(e.target.name);
  };

  const renderTypes = useMemo(() => {
    return transactionTypes.map((transactionType) => {
      return (
        <Radio
          key={`type-${transactionType}`}
          wrapperClassName=""
          label={transactionType}
          value={transactionType}
          changeValue={changeType}
          name={transactionType}
          checked={type === transactionType}
        />
      );
    });
  }, [transactionTypes]);

  return (
    <div>
      <h1>Budget</h1>
      <div className="flex">{renderTypes}</div>
      {isLoaded ? (
        <div className="section">
          <h2>{type}</h2>
          {<Transactions transactions={transactions[type]} type={type} />}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Budget;
