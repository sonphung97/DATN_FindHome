import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles,...rest }) => {
  const { isAuth, currentRole } = useSelector(state => state.auth);

  //kiem tra quyen truy cap trang
  const checkRoleAccess = () => {
    return roles.find(role => role === currentRole);
  }
  
  return (
    <Route
      {...rest}
      render={props =>
        (isAuth && checkRoleAccess()) ?
          <Component {...props} /> :
          <Redirect to="/" />
      }
    />
  );
};

export default withRouter(PrivateRoute);
