import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import Appointment from "../pages/Appointment";
import UserList from "../pages/UserList";

import NavBar from "../ui/NavBar";

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/appointment" component={Appointment} />
        <Route path="/userlist" component={UserList} />
      </Switch>
    </Router>
  );
};

export default Routes;
