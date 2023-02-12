import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import LandingPageRestaurants from "./components/Restaurants/AllRestaurants";

function App() {
  return (
    <>
      <Route path='/' component={NavBar} />
      <Switch>
        <Route exact path="/">
          <LandingPageRestaurants />
        </Route>
      </Switch>
    </>
  );
}

export default App;
