import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Loader = ({ isFullscreen = false }) => {
  return (
    <div className={`loader${isFullscreen ? 'loader--fullscreen' : ''}`}>
      <div className="loader__wrapper">
        <div className="loader__spinner" />
        <div className="loader__label">Loading...</div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  children: PropTypes.node,
  isBlurred: PropTypes.bool,
  isFullscreen: PropTypes.bool,
};

export default Loader;
