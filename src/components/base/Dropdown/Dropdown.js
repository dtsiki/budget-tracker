import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useMemo, useRef, useState } from 'react';

import Scrollbar from './../Scrollbar';

import './style.scss';

const Dropdown = ({ dropdownClassName, label, items, height = 200 }) => {
  const [isDropdownOpened, setDropdownOpened] = useState(false);
  const ref = useRef();

  const toggleDropdown = () => {
    setDropdownOpened((isDropdownOpened) => !isDropdownOpened);
  };

  const renderItems = useMemo(() => {
    if (Array.isArray(items) && items.length) {
      return items.map((item, index) => (
        <li key={`dropdown-item-${item}-${index}`} className="dropdown-item">
          {item}
        </li>
      ));
    }

    return <li className="">Not available</li>;
  }, [items]);

  return (
    <div className={`dropdown${dropdownClassName ? ` ${dropdownClassName}` : ''}`} ref={ref}>
      <button
        className={`dropdown-header${isDropdownOpened ? ' dropdown-header--active' : ''}${
          dropdownClassName ? `${dropdownClassName}-header` : ''
        }`}
        onClick={toggleDropdown}
      >
        <span className="dropdown-header__label">{label}</span>
        <span className="dropdown-header__dropdown">
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </button>
      {isDropdownOpened && (
        <ul className={`dropdown-content${dropdownClassName ? ` ${dropdownClassName}-content` : ''}`}>
          <Scrollbar height={height}>{renderItems}</Scrollbar>
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  dropdownClassName: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  height: PropTypes.number,
};

export default Dropdown;
