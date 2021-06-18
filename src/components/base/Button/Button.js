import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Button = ({ children, onClick, type = 'submit', variant = 'primary' }) => {
  return (
    <button onClick={onClick} type={type} className={`button button--${variant}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.string,
};

export default Button;
