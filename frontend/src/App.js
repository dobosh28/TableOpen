import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import LandingPageRestaurants from "./components/Restaurants/AllRestaurants";
import RestaurantPage from "./components/RestaurantPage/RestaurantPage";
import ReservationConfirmForm from "./components/Reservations/ReservationConfirmForm/ReservationConfirmForm";
import ReservationConfirmation from "./components/Reservations/ReservationConfirmation/ReservationConfirmation";
import ReservationModifyPage from "./components/Reservations/ReservationModifyPage/ReservationModifyPage";
import DiningDashboard from "./components/DiningDashboard/DiningDashboard";
import ReviewForm from "./components/Reviews/ReviewForm/ReviewForm";
import UpdateReviewPage from "./components/Reviews/UpdateReviewPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" component={NavBar} />

        <Switch>
          <Route exact path="/" component={LandingPageRestaurants} />
          <Route
            exact
            path="/restaurants/:restaurantId"
            component={RestaurantPage}
          />
          <Route
            exact
            path="/restaurants/:restaurantId/review"
            component={ReviewForm}
          />
          <Route
            exact
            path="/restaurants/:restaurantId/review/:reviewId"
            component={UpdateReviewPage}
          />
          <Route
            exact
            path="/reservation/details"
            component={ReservationConfirmForm}
          />
          <Route
            exact
            path="/reservations/:reservationId/confirmation"
            component={ReservationConfirmation}
          />
          <Route
            exact
            path="/reservations/:reservationId/modify"
            component={ReservationModifyPage}
          />
          <Route
            exact
            path="/user/:userId/dining-dashboard"
            component={DiningDashboard}
          />
        </Switch>

        <Route path="/" component={Footer} />
      </BrowserRouter>
    </>
  );
}

export default App;
