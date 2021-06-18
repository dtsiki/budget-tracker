import PropTypes from 'prop-types';
import React from 'react';

import Text from './../../base/Text';

import './style.scss';

const Error = ({ message = 'Something went wrong' }) => {
  return (
    <div>
      <h1>Oops!</h1>
      <Text hasGap>{message}</Text>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
