import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Category from './../Category';

import './style.scss';

const Transactions = ({ transactions, type }) => {
  const renderTransactions = useMemo(() => {
    if (!transactions?.length) return <div>No transactions</div>;

    if (Array.isArray(transactions)) {
      return (
        <ul className="transactions">
          {transactions.map((transaction, id) => {
            const { description, value, currency, category } = transaction;
            return (
              <li key={`transactions-${id}`} className="transactions__item transaction">
                <div className="flex flex-align-items-center">
                  <Category category={category} />
                  <div>{description}</div>
                </div>
                <div>
                  {type === 'incomes' ? '+' : '-'}
                  {value} {currency}
                </div>
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
  transactions: PropTypes.array,
};

export default Transactions;
