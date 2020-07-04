import React from 'react';  
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            rest.auth.isAuthenticated() ? (
            <Component {...props} auth={rest.auth} />
          ) : (
            rest.auth.login()
          )
        }
      />
    );
  }

export default PrivateRoute;  