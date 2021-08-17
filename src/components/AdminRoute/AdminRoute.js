import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
  const userInfo = useSelector((state) => state.user);
  console.log(userInfo);
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.data.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}
