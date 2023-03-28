import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservation, fetchReservation } from "../../../store/reservations";
import { useParams } from "react-router-dom";
import "./ReservationConfirmation.css";
import { getRestaurant } from "../../../store/restaurants";

const ReservationConfirmation = () => {
  const dispatch = useDispatch();
  const { reservationId } = useParams();
  const reservation = useSelector(getReservation(reservationId));
  const restaurantId = reservation?.restaurantId;
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);

  
  useEffect(() => {
    dispatch(fetchReservation(reservationId));
  }, [dispatch, reservationId ]);

  const allReservations = useSelector(state => Object.values(state.reservations));
  console.log(allReservations);
  

  


  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <main className="res-confirmation-main">
        <div className="res-confirmation-container">
          <div className="res-confirmation-inner">
            <div className="res-confirmation-holders">
              <section className="res-confirmation-details">
                <section className="res-confirmation-details-inner">
                  <div className="confirmation-details-div">
                    <div className="res-confirmation-restaurant-pic">
                      <img src="" alt="" />
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </div>
      </main>

      <div>
        <h1>Reservation Confirmation</h1>
        {reservation && (
          <div>
            <h2>Party size: {reservation.partySize}</h2>
            <h2>Date: {formatDate(reservation.date)}</h2>
            <h2>Time: {reservation.time}</h2>
          </div>
        ) }
      </div>
    </>
  );
};

export default ReservationConfirmation;
