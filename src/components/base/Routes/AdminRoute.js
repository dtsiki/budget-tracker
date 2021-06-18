import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Error from './../../pages/Error';

const AdminRoute = ({ component: Component, isAdmin, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLogin ? (
          isAdmin ? (
            <Component {...props} />
          ) : (
            <Error message="Access denied ⛔" />
          )
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

AdminRoute.propTypes = {
  component: PropTypes.any,
  isAdmin: PropTypes.bool,
  isLogin: PropTypes.bool,
};

export default AdminRoute;
