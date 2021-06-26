import PropTypes from 'prop-types';
import React from 'react';
import { useStoreon } from 'storeon/react';

import Footer from './Footer';

import './style.scss';

const Dashboard = ({ children }) => {
  const { dispatch, user } = useStoreon('user');

  return (
    <div className="dashboard">
      <div className="dashboard__content">{children}</div>
      <Footer />
    </div>
  );
};

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
