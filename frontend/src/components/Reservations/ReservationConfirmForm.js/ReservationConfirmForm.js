import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReservation } from "../../../store/reservations";
import { useLocation, useHistory } from "react-router-dom";
import "./ReservationConfirmForm.css";

const ReservationConfirmForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { restaurant, currentUser } = location.state;

  const [reservationData, setReservationData] = useState({
    partySize: null,
    date: null,
    time: "",
    userId: null,
    restaurantId: restaurant.id,
    email: currentUser.email,
    phone: "1234567890",
    specialRequest: "",
    occasion: "",
  });

  useEffect(() => {
    if (!location.state) {
      history.push("/");
      window.location.reload();
    } else {
      const { party_size, date, time } = location.state;
      setReservationData((prevState) => ({
        ...prevState,
        partySize: party_size,
        date: date,
        time: time,
        userId: currentUser.id,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservation = {
      ...reservationData,
      restaurant_id: reservationData.restaurantId,
      user_id: reservationData.userId,
      phone_number: reservationData.phone,
    };
    const newReservation = await dispatch(
      createReservation(reservation, reservationData.restaurantId)
    );
    history.push(`/reservations/${newReservation.id}`);
  };

  const update = (field) => {
    return (e) => {
      setReservationData((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    };
  };

  const convertTime = (time) => {
    if (time === "") return "";
    let newTime = "";
    let hour = parseInt(time.slice(0, 2));
    if (hour >= 12) {
      hour -= 12;
      newTime = `${hour}${time.slice(2, 6)} PM`;
    } else {
      newTime = `${hour}${time.slice(2, 6)} AM`;
    }
    return newTime;
  };

  const routeToRestaurant = () => {
    history.push(`/restaurants/${restaurant.id}`);
  };

  return (
    <>
      <main className="main">
        <div className="contents">
          <div className="inner-contents">
            <div className="inner-inner-contents">
              <section className="form-section">
                <h1 className="almost-done">You're almost done!</h1>
                <div className="photo-time-date-size">
                  <div className="restaurant-photo-div">
                    <img src={restaurant.photoUrl} className="restaurant-photo" />
                  </div>
                  <div className="name-date-time-size">
                    <div onClick={routeToRestaurant} className="route-to-restaurant">
                      <h2 className="restaurant-name-res">{restaurant.name}</h2>
                    </div>
                  </div>
                </div>
              </section>
              <div className="dining-info">
                <aside className="booking-policies-section">
                  <h1 className="what-to-know">
                    What to know before you go
                  </h1>
                  <section className="what-to-know-info">
                    <h1 className="important-info">Important dining information</h1>
                    <p className="important-info-text">
                      We have a 20 minute grace period. Please call us if you are running later than 20 minutes after your reservation time.
                      <br />
                      <br />
                      We may contact you about this reservation, so please ensure your email and phone number are up to date.
                      <br />
                      <br />
                      Your table will be reserved for 1 hour 30 minutes for parties of up to 2; and 2 hours for parties of 3+.
                    </p>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </div>  
      </main>


      <div className="reservation-confirm-form">
        <h1>You're almost done!</h1>
        <br />

        <div className="reservation-confirm-form__info">
          <img src={restaurant.photoUrl} />
          <h2>{restaurant.name}</h2>
          <p>{reservationData.partySize}</p>
          <p>{reservationData.date}</p>
          <p>{convertTime(reservationData.time)}</p>
          <br />
        </div>

        <form onSubmit={handleSubmit} className="reservation-form">
          <h3>Diner details</h3>
          <p>
            {currentUser.firstName} {currentUser.lastName}
          </p>
          <input
            type="text"
            placeholder="Phone number"
            onChange={update("phone_number")}
            required
          />
          <input type="email" value={reservationData.email} readOnly />
          <br />
          <select onChange={update("occasion")}>
            <option value="None">Select an occasion (optional)</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Date">Date night</option>
            <option value="Business">Business Meal</option>
            <option value="Celebration">Celebration</option>
          </select>
          <br />
          <textarea
            placeholder="Add a special request (optional)"
            onChange={update("special_request")}
          />
          <br />

          <input type="submit" value="Complete Reservation" />
          <div className="reservation-confirm-form-terms">
            <p>
              By clicking “Complete reservation” you agree to the{" "}
              <span>TableOpen Terms of Use</span> and{" "}
              <span>Privacy Policy</span>.{" "}
            </p>
          </div>
        </form>
        <div className="reservation-confirm-form-note">
          <h3>What to know before you go</h3>
          <h4>Important dining information</h4>
          <p>
            We may contact you about this reservation, so please ensure your
            email and phone number are up to date.
          </p>
        </div>
      </div>
    </>
  );
};

export default ReservationConfirmForm;
