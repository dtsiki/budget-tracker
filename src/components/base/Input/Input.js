import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Input = ({
  wrapperInputClassName,
  inputClassName,
  labelClassName,
  isLabelVisuallyHidden = false,
  type,
  id,
  value,
  onChange,
  placeholder,
  name,
  label,
  icon,
}) => {
  return (
    <div
      className={`input${icon ? ' input--has-icon' : ''}${wrapperInputClassName ? ` ${wrapperInputClassName}` : ''}`}
    >
      {icon && <div className="input__icon">{icon}</div>}
      <label
        className={`input__label${isLabelVisuallyHidden ? ' input__label--hidden' : ''}${
          labelClassName ? ` ${labelClassName}` : ''
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`input__field${inputClassName ? ` ${inputClassName}` : ''}`}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(name, value) => onChange(name, value)}
      />
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  inputClassName: PropTypes.string,
  wrapperInputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  isLabelVisuallyHidden: PropTypes.bool,
  icon: PropTypes.node,
};

export default Input;
