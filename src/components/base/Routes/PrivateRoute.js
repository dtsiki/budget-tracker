import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Dashboard from './../../common/Dashboard';
import Error from './../../pages/Error';

const PrivateRoute = ({ component: Component, isForbidden, ...rest }) => {
  const { user } = useStoreon('user');
  const hasAccess = !isForbidden ? true : isForbidden && user.isAdmin;

  return (
    <Route
      {...rest}
      render={(props) => {
        return user.isLogin ? (
          <Dashboard>{hasAccess ? <Component {...props} /> : <Error message="Access denied" />}</Dashboard>
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  isForbidden: PropTypes.bool,
};

export default PrivateRoute;
