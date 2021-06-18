import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Text = ({ children, align, textClassName, hasGap }) => {
  return (
    <p
      className={`text${align ? ` text--${align}` : ''}${textClassName ? ` ${textClassName}` : ''}${
        hasGap ? ' text--has-gap' : ''
      }`}
    >
      {children}
    </p>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
  textClassName: PropTypes.string,
  hasGap: PropTypes.bool,
};

export default Text;
