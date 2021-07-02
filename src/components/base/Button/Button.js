import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Button = ({
  children,
  onClick,
  type = 'submit',
  variant = 'primary',
  icon,
  iconClassName,
  isDisabled = false,
  isHiddenLabel = false,
  customClassName,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button button--${variant}${isDisabled ? ' button$--disabled' : ''}${
        customClassName ? ` ${customClassName}` : ''
      }`}
    >
      {icon && <span className={`button__icon ${iconClassName || ''}`}>{icon}</span>}
      <span className={`button__label${isHiddenLabel ? ' button__label--hidden' : ''}`}>{children}</span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.string,
  icon: PropTypes.node,
  iconClassName: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isHiddenLabel: PropTypes.bool,
  customClassName: PropTypes.string,
};

export default Button;
