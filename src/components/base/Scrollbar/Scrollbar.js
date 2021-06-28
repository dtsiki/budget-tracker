import PropTypes from 'prop-types';
import React from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import './style.scss';

const Scrollbar = ({ scrollbarClassName = '', children, height = '100%', onScroll = (e) => e, autoHide = true }) => {
  const defaultOptions = {
    autoHide: true,
    clickOnTrack: false,
    style: {
      maxHeight: height,
      height: '100%',
      width: '100%',
    },
  };

  return (
    <SimpleBar
      {...defaultOptions}
      className={`custom-scrollbar${scrollbarClassName ? ` ${scrollbarClassName}` : ''}`}
      onScroll={onScroll}
      autoHide={autoHide}
    >
      {children}
    </SimpleBar>
  );
};

Scrollbar.propTypes = {
  scrollbarClassName: PropTypes.string,
  children: PropTypes.any,
  onScroll: PropTypes.func,
  height: PropTypes.number,
  autoHide: PropTypes.bool,
};

export default Scrollbar;
