import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import LandingPageRestaurants from "./components/Restaurants/AllRestaurants";
import RestaurantPage from "./components/RestaurantPage/RestaurantPage";
import ReviewForm from "./components/Reviews/ReviewForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path='/' component={NavBar} />
        <Switch>
          <Route exact path="/">
            <LandingPageRestaurants />
          </Route>
          <Route exact path="/restaurants/:restaurantId">
            <RestaurantPage />
          </Route>
          <Route exact path="/restaurants/*/reviews/:reviewId/form">
            <ReviewForm />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
