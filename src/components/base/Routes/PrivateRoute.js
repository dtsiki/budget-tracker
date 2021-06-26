import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Dashboard from './../../common/Dashboard';

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLogin ? (
          <Dashboard>
            <Component {...props} />
          </Dashboard>
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  isLogin: PropTypes.bool,
};

export default PrivateRoute;
