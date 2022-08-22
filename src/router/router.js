import React, { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import RouteConfig from "../router/router.config";
import PageNavigationLister from "../utils/pageNavLister";
import { authStore } from "../services";

const PrivateRoute = ({ location, component, ...rest }) =>
  authStore.getAuth()?.uid ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: location } }} />
  );

const RouteList = () => (
  <Switch>
    {RouteConfig.map(({ path, component, protect }, key) =>
      protect ? (
        <PrivateRoute path={path} component={component} exact key={key} />
      ) : (
        <Route path={path} exact key={key} component={component} />
      )
    )}
  </Switch>
);

export default function AppRoute() {
  return (
    <>
      <PageNavigationLister />
      <Suspense fallback={<p>App Loading</p>}>
        <RouteList />
      </Suspense>
    </>
  );
}
