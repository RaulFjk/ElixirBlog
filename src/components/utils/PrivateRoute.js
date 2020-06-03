import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
    console.log(getToken());
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />}
    />
  )
}
 
export default PrivateRoute;