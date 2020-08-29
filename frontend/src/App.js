import React from "react";
import "./App.css";

import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import Profile from "./Pages/Profile/Profile";
import Journey from "./Pages/Journey/Journey";
import HomeLogin from "./Pages/Home/HomeLogin";
import Search from "./Components/Search/Search";
import Bookmark from "./Pages/Bookmark/Bookmark";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/home/login">
            <HomeLogin />
          </Route>
          <PrivateRoute path="/addJourney" component={Journey} />
          <Route path="/search/s=:title">
            <Search />
          </Route>
          <PrivateRoute path="/bookmark" component={Bookmark} />
          <PrivateRoute path="/profile/:id" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
