import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Checkbox = ({ checkboxClassName, name, label, labelClassName, value, onChange }) => {
  return (
    <div className={`checkbox${checkboxClassName ? ` ${checkboxClassName}` : ''}`}>
      <input
        onChange={onChange}
        className={`checkbox__input`}
        id={name}
        name={name}
        type="checkbox"
        value={value}
        checked={value}
      />
      <label className={`checkbox__label${labelClassName ? ` ${labelClassName}` : ''}`} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  labelClassName: PropTypes.string,
  checkboxClassName: PropTypes.string,
};

export default Checkbox;
