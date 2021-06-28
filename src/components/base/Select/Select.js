import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import './style.scss';

const Select = ({
  wrapperClassName,
  name,
  value,
  changeValue,
  options,
  defaultLabel,
  label,
  isLabelVisible = true,
}) => {
  const selectOptions = useMemo(() => {
    const defaultOption = (
      <option value="" key={`${name}-default-option`}>
        {defaultLabel}
      </option>
    );

    const selectOptions = options.map((option, index) => {
      return (
        <option key={`${name}-${option}-${index}`} value={option}>
          {option}
        </option>
      );
    });

    return [defaultOption, ...selectOptions];
  }, [options]);

  return (
    <div
      className={`select${isLabelVisible ? ' select--has-label' : ''}${wrapperClassName ? ` ${wrapperClassName}` : ''}`}
    >
      {isLabelVisible && (
        <label htmlFor={name} className="select__label">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className={`select__dropdown ${wrapperClassName ? ` ${wrapperClassName}--dropdown` : ''}`}
        value={value}
        onChange={changeValue}
      >
        {selectOptions}
      </select>
      <span className="select__dropdown-icon">
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  isLabelVisible: PropTypes.bool,
  changeValue: PropTypes.func,
  value: PropTypes.any,
  wrapperClassName: PropTypes.string,
  options: PropTypes.array,
  defaultLabel: PropTypes.string,
};

export default Select;
