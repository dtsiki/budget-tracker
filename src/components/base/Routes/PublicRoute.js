import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div className="public">
            <Component {...props} />
          </div>
        );
      }}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.any,
  wrapper: PropTypes.any,
};

export default PublicRoute;
