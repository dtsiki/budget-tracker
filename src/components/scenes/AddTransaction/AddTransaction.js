import React, { useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import defaultCategories from './../../../constants/defaultCategories';
import defaultCurrencies from './../../../constants/defaultCurrencies';
import { addTransaction } from './../../../controllers/firebase/transactions';
import Button from './../../base/Button';
import Dropdown from './../../base/Dropdown';
import Input from './../../base/Input';
import Loader from './../../base/Loader';
import Radio from './../../base/Radio';
import Select from './../../base/Select';
import Calendar from './../../common/Calendar';

const AddTransaction = () => {
  const { user, dispatch } = useStoreon('user');
  const [isTransactionProcessing, setTransactionProcessing] = useState(false);
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('expense');
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState({
    selectedDate: new Date(),
    category: '',
    type: '',
    currency: 'RUB',
    note: '',
  });

  useEffect(() => {
    if (type) setCategories(defaultCategories[type]);
  }, [type]);

  const setSelectedDate = (date) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      selectedDate: date,
    }));
  };

  const changeCategory = (e) => {
    setCategory(e.target.value);
  };

  const changeType = (e) => {
    setType(e.target.name);
  };

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const addNote = (e) => {
    setNote(e.target.value);
  };

  const addDescription = (e) => {
    setDescription(e.target.value);
  };

  const addPlace = (e) => {
    setPlace(e.target.value);
  };

  const selectCurrency = (currency) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      currency: currency,
    }));
  };

  const submitTransaction = async () => {
    setTransactionProcessing(true);
    const data = {
      date: transaction.selectedDate,
      category: category,
      currency: transaction.currency,
      value: value,
      note: note,
      type: type + 's',
      description: description,
      place: place,
    };

    const result = await addTransaction(user.userId, data);
    if (result) {
      setTransactionProcessing(false);
      dispatch('notifications/add', result);
      setCategory('');
      setNote('');
      setPlace('');
      setDescription('');
      setValue('');
    }
  };

  const renderСurrencies = useMemo(() => {
    return defaultCurrencies.map((currency) => {
      return (
        <button key={`currency-${currency}`} onClick={() => selectCurrency(currency)}>
          {currency}
        </button>
      );
    });
  }, [defaultCurrencies]);

  return (
    <div>
      <h1>Add transaction</h1>
      <div className={`row section${isTransactionProcessing ? ' section--has-loader' : ''}`}>
        <div className="col-6">
          <div className="">
            <h2>Date</h2>
            <Calendar selectedDate={transaction.selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <div className="">
            <h2>{type} category</h2>
            <Select
              wrapperClassName=""
              name="category"
              value={category}
              changeValue={changeCategory}
              options={categories}
              defaultLabel="Select category"
              isLabelVisible={false}
            />
          </div>
          <div className="">
            <h2>Type</h2>
            <div className="flex">
              <Radio
                wrapperClassName=""
                label="Expense"
                value="expense"
                changeValue={changeType}
                name="expense"
                checked={type === 'expense'}
              />
              <Radio
                wrapperClassName=""
                label="Income"
                value="income"
                changeValue={changeType}
                name="income"
                checked={type === 'income'}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="">
            <h2>{type} settings</h2>
            <Input
              value={value}
              onChange={(e) => changeValue(e)}
              type="text"
              name="value"
              id="value"
              placeholder="Example: 56"
              label="Value:"
            />
            <Input
              value={description}
              onChange={(e) => addDescription(e)}
              type="text"
              name="description"
              id="description"
              placeholder="Example: Chocolate muffin"
              label="Description:"
            />
            <Input
              value={note}
              onChange={(e) => addNote(e)}
              type="text"
              name="note"
              id="note"
              placeholder="Example: Lunch"
              label="Note:"
            />
            <Input
              value={place}
              onChange={(e) => addPlace(e)}
              type="text"
              name="place"
              id="place"
              placeholder="Example: SPAR"
              label="Place:"
            />
            <Dropdown label={`Currency (${transaction.currency})`} items={renderСurrencies} />
          </div>
        </div>
        {isTransactionProcessing && (
          <div className="section__loader">
            <Loader />
          </div>
        )}
      </div>
      <Button onClick={submitTransaction}>Add transaction</Button>
    </div>
  );
};

export default AddTransaction;
