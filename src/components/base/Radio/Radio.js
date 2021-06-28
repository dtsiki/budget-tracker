import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Radio = ({ id, name, value, changeValue, label, radioClassName, labelClassName, defaultChecked = false }) => {
  return (
    <div className="radio">
      <input
        className={`radio__input${radioClassName ? ` ${radioClassName}` : ''}`}
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={(value) => changeValue(value)}
        defaultChecked={defaultChecked}
      />
      <label className={`radio__label${labelClassName ? ` ${labelClassName}` : ''}`} htmlFor={id}>
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
  defaultChecked: PropTypes.bool,
};

export default Radio;
