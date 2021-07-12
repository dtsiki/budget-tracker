import React, { useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Radio from '../../base/Radio';
import defaultCurrencies from './../../../constants/defaultCurrencies';
import { updateCurrency } from './../../../controllers/firebase/currency';
import Dropdown from './../../base/Dropdown';
import Categories from './../../common/Categories';

import './style.scss';

const Settings = () => {
  const { userCurrency, user, dispatch } = useStoreon('user', 'userCurrency');
  const [currency, setCurrency] = useState(userCurrency);

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

  return (
    <div>
      <h1>Settings</h1>
      <div className="section">
        <h2>Manage categories</h2>
        <Categories />
      </div>
      <div className="section">
        <h2>Manage currency</h2>
        <Dropdown label={`Currency (${currency})`} items={renderСurrencies} />
      </div>
    </div>
  );
};

export default Settings;
