import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import LandingPageRestaurants from "./components/Restaurants/AllRestaurants";
import RestaurantPage from "./components/RestaurantPage/RestaurantPage";
import ReviewForm from "./components/Reviews/ReviewForm";
import ReservationConfirmForm from "./components/Reservations/ReservationConfirmForm.js/ReservationConfirmForm";


function App() {
  return (
    <>
      <BrowserRouter>
        <Route path='/' component={NavBar} />

        <Switch>
          <Route exact path="/" component={LandingPageRestaurants} />
          <Route exact path="/restaurants/:restaurantId" component={RestaurantPage} />
          <Route exact path="/restaurants/*/reviews/:reviewId/form" component={ReviewForm} />
          <Route exact path="/reservation/details"  component={ReservationConfirmForm} />
        </Switch>
        
      </BrowserRouter>
    </>
  );
}

export default App;
