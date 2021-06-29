import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Radio = ({ name, value, changeValue, label, wrapperClassName, radioClassName, labelClassName, checked }) => {
  return (
    <div className={`radio${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <input
        className={`radio__input${radioClassName ? ` ${radioClassName}` : ''}`}
        type="radio"
        name={name}
        id={name}
        value={value}
        onChange={(value) => changeValue(value)}
        checked={checked}
      />
      <label className={`radio__label${labelClassName ? ` ${labelClassName}` : ''}`} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  changeValue: PropTypes.func,
  label: PropTypes.string,
  radioClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  checked: PropTypes.bool,
  wrapperClassName: PropTypes.string,
};

export default Radio;
