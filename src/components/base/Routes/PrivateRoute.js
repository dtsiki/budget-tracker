import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLogin ? <Component {...props} /> : <Redirect to="/signin" />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  isLogin: PropTypes.bool,
};

export default PrivateRoute;
