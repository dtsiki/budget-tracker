import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import './style.scss';

const Transactions = ({ transactions }) => {
  const renderTransactions = useMemo(() => {
    if (!transactions) return <div>No transactions</div>;

    if (Array.isArray(transactions)) {
      return (
        <ul className="transactions">
          {transactions.map((transaction, id) => {
            return (
              <li key={`transactions-${id}`} className="transactions__item transaction">
                <div>{transaction.note}</div>
                <div>{transaction.amount}</div>
              </li>
            );
          })}
        </ul>
      );
    }
  }, [transactions]);

  return renderTransactions;
};

Transactions.propTypes = {
  transactions: PropTypes.object,
};

export default Transactions;
