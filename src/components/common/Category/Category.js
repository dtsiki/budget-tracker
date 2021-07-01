import {
  faAward,
  faBookReader,
  faBriefcase,
  faBus,
  faDumbbell,
  faFileInvoice,
  faFilm,
  faGift,
  faHeartbeat,
  faHouseUser,
  faLaptop,
  faPercentage,
  faPizzaSlice,
  faRoute,
  faTag,
  faTshirt,
  faUndoAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import './style.scss';

const Category = ({ category }) => {
  const icons = {
    Food: <FontAwesomeIcon icon={faPizzaSlice} />,
    Transportation: <FontAwesomeIcon icon={faBus} />,
    Personal: <FontAwesomeIcon icon={faUser} />,
    Entertainment: <FontAwesomeIcon icon={faFilm} />,
    Gifts: <FontAwesomeIcon icon={faGift} />,
    Education: <FontAwesomeIcon icon={faBookReader} />,
    Healthcare: <FontAwesomeIcon icon={faHeartbeat} />,
    Travel: <FontAwesomeIcon icon={faRoute} />,
    Housing: <FontAwesomeIcon icon={faHouseUser} />,
    Bills: <FontAwesomeIcon icon={faFileInvoice} />,
    Clothing: <FontAwesomeIcon icon={faTshirt} />,
    Tech: <FontAwesomeIcon icon={faLaptop} />,
    Training: <FontAwesomeIcon icon={faDumbbell} />,
    Salary: <FontAwesomeIcon icon={faBriefcase} />,
    Cashback: <FontAwesomeIcon icon={faUndoAlt} />,
    Interest: <FontAwesomeIcon icon={faPercentage} />,
    Award: <FontAwesomeIcon icon={faAward} />,
  };

  const renderIcon = useMemo(() => {
    if (!category || !icons[category]) return <FontAwesomeIcon icon={faTag} />;

    return icons[category];
  }, [category, icons]);

  return (
    <div className="category">
      <span className="category__icon">{renderIcon}</span>
      <span className="category__name">{category}</span>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.string,
};

export default Category;
