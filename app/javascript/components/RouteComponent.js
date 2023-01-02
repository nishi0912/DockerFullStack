import React from "react";
import { Affix } from "antd";
import { Route } from "react-router";
import Header from "./Header";

const RouteComponent = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Affix style={{ background: "#f3f3f6 " }} offsetTop={0}>
              <Header />
            </Affix>
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export default RouteComponent;
