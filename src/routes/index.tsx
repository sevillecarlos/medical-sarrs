import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import NavBar from "../ui/NavBar";

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/inventory" component={Inventory} />

      </Switch>
    </Router>
  );
};

export default Routes;
