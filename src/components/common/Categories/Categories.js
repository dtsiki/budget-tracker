import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Button from '../../base/Button';
import defaultCategories from './../../../constants/defaultCategories';
import { addCategories, getCategories } from './../../../controllers/firebase/categories';
import Input from './../../base/Input';
import Loader from './../../base/Loader';
import Radio from './../../base/Radio';

import './style.scss';

const Categories = () => {
  const { user, dispatch } = useStoreon('user');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [localCategories, setLocalCategories] = useState('');
  const [type, setType] = useState('expense');
  const [isInitializing, setInitializing] = useState({
    categories: true,
    updating: false,
  });
  const [isCategoriesUpdated, setUpdateCategories] = useState(false);

  const fetchCategories = async () => {
    setInitializing((prevInitializing) => ({
      ...prevInitializing,
      categories: true,
    }));

    const result = await getCategories(user.userId);

    setCategories(result);
    setUpdateCategories(false);
    setInitializing((prevInitializing) => ({
      ...prevInitializing,
      categories: false,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const updateCategories = async () => {
      const result = await addCategories(user.userId, localCategories);
      dispatch('notifications/add', result);

      fetchCategories();
    };

    if (isCategoriesUpdated) updateCategories();
  }, [isCategoriesUpdated]);

  const changeType = (e) => {
    setType(e.target.name);
  };

  const changeCategory = (e) => {
    setCategory(e.target.value);
  };

  const addCategory = async () => {
    if (categories[type]) {
      setLocalCategories(categories);

      const currentCategories = [...categories[type]];
      const newCategories = currentCategories.concat(category);

      setLocalCategories((prevLocalCategories) => ({
        ...prevLocalCategories,
        [type]: newCategories,
      }));
    } else {
      setLocalCategories((prevLocalCategories) => ({
        ...prevLocalCategories,
        [type]: [category],
      }));
    }

    setUpdateCategories(true);
  };

  const removeCategory = (category) => {
    setLocalCategories(categories);

    const currentCategories = [...categories[type]];
    const categoryIndex = currentCategories.indexOf(category);
    const newCategories = currentCategories.filter((item, index) => index !== categoryIndex);

    setLocalCategories((prevLocalCategories) => ({
      ...prevLocalCategories,
      [type]: newCategories,
    }));

    setUpdateCategories(true);
  };

  const resetCategories = async () => {
    setLocalCategories(defaultCategories);
    setUpdateCategories(true);
  };

  const renderCategories = useMemo(() => {
    if (!categories) return;

    if (categories[type]) {
      return categories[type].map((category) => {
        return (
          <li key={`categories-${category}`} className="categories__item categories-tag">
            <span className="categories-tag__label">{category}</span>
            <button
              onClick={() => removeCategory(category)}
              className="categories-tag__button categories-remove-button"
            >
              <span className="categories-remove-button__icon">
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className="categories-remove-button__label">Remove</span>
            </button>
          </li>
        );
      });
    }
  }, [categories, type]);

  return (
    <>
      <div className="section">
        <h2>Categories</h2>
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
        <Input
          value={category}
          onChange={(e) => changeCategory(e)}
          type="text"
          name="category"
          id="category"
          placeholder=""
          label="Add category:"
        />
        <Button onClick={addCategory}>Add new category</Button>
        {isInitializing.categories ? <Loader /> : <ul className="categories">{renderCategories}</ul>}
        <Button onClick={resetCategories} variant="secondary">
          Reset categories
        </Button>
      </div>
    </>
  );
};

export default Categories;
