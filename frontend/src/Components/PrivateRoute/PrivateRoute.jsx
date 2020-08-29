import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const { userId, token } = localStorage;

  if (token) {
    if (userId != 1 && token) {
      return <Route path={props.path} component={props.component} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return <Redirect to="/" />;
}

export default PrivateRoute;
