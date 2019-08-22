import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated, getToken } from "./services/auth";
import api from "./services/api";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import App from "./pages/App";
import CreateQuestion from "./pages/Questions/CreateQuestion";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props => (

        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      )
    }
  />
);


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />

      <PrivateRoute exact path="/app" component={App} />
      <PrivateRoute exact path="/createQuestion" component={CreateQuestion} />
      

      <PrivateRoute exact path="/home" component={Home} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;