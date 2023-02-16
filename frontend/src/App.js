import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import LandingPageRestaurants from "./components/Restaurants/AllRestaurants";
import RestaurantPage from "./components/RestaurantPage/RestaurantPage";
import ReviewsShow from "./components/Reviews/ReviewsShow";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path='/' component={NavBar} />
        <Switch>
          <Route exact path="/">
            <LandingPageRestaurants />
          </Route>
          <Route path="/restaurants/:restaurantId">
            <RestaurantPage />
            <ReviewsShow />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
