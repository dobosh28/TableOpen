import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReservation } from "../../../store/reservations";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { logout } from "../../../store/session";
import "./ReservationConfirmForm.css";

const ReservationConfirmForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { restaurant, currentUser } = location.state;

  const [reservationData, setReservationData] = useState({
    party_size: 2,
    date: "",
    time: "",
    userId: "",
    restaurantId: restaurant.id,
    email: currentUser.email,
    phoneNumber: "",
    specialRequest: "",
    occasion: "",
  });

  useEffect(() => {
    if (!location.state) {
      history.push("/");
      window.location.reload();
    } else {
      const { party_size, date, time } = location.state
      console.log(party_size, date, time)
      setReservationData((prevState) => ({
        ...prevState,
        party_size: party_size,
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
      phone_number: reservationData.phoneNumber,
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

  const handleLogout = () => {
    dispatch(logout());
    history.push(`/restaurants/${restaurant.id}`);
  };

  return (
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
                  <div
                    onClick={routeToRestaurant}
                    className="route-to-restaurant"
                  >
                    <h2 className="restaurant-name-res">{restaurant.name}</h2>
                  </div>
                  <div className="date-time-size">
                    <ul className="dts-list">
                      <li className="date-list-item">
                        <div className="date-icon-text">
                          <span>
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="fa-calendar"
                            />
                          </span>
                          <p>{reservationData.date}</p>
                        </div>
                      </li>
                      <li className="time-list-item">
                        <div className="time-icon-text">
                          <span>
                            <FontAwesomeIcon
                              icon={faClock}
                              className="fa-clock"
                            />
                          </span>
                          <p>{convertTime(reservationData.time)}</p>
                        </div>
                      </li>
                      <li className="size-list-item">
                        <div className="size-icon-text">
                          <span>
                            <FontAwesomeIcon
                              icon={faUser}
                              className="fa-user"
                            />
                          </span>
                          <p>{reservationData.party_size} people</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <h2 className="diner-details">Diner details</h2>
              <div className="current-diner">
                {currentUser.firstName} {currentUser.lastName} (
                <span onClick={handleLogout}>Not {currentUser.firstName}?</span>
                )
              </div>
              <form
                className="reservation-confirm-form"
                onSubmit={handleSubmit}
                autoComplete="on"
              >
                <div className="form-inputs">
                  <div className="form-inputs__phone">
                    <div className="phone-div">
                      <input
                        className="phone-input"
                        type="text"
                        placeholder="Phone number"
                        onChange={update("phoneNumber")}
                      />
                    </div>
                  </div>
                  <div className="form-inputs__email">
                    <div className="email-div">
                      <input
                        className="email-input"
                        value={currentUser.email}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="form-inputs">
                  <div className="form-inputs__occasion">
                    <div className="occasion-div">
                      <select onChange={update("occasion")}>
                        <option value="None">
                          Select an occasion (optional)
                        </option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Date">Date night</option>
                        <option value="Business">Business Meal</option>
                        <option value="Celebration">Celebration</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-inputs__special-request">
                    <div className="special-request-div">
                      <textarea
                        placeholder="Add a special request (optional)"
                        onChange={update("special_request")}
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Complete reservation"
                  className="submit-reservation"
                />
              </form>
              <div className="confirmation-statement">
                By clicking “Complete reservation” you agree to the{" "}
                <span className="table-open-span">TableOpen Terms of Use</span>{" "}
                and <span className="table-open-span">Privacy Policy</span>.
                Standard text message rates may apply. You may opt out of
                receiving text messages at any time.
              </div>
            </section>
            <div className="dining-info">
              <aside className="booking-policies-section">
                <h1 className="what-to-know">What to know before you go</h1>
                <section className="what-to-know-info">
                  <h1 className="important-info">
                    Important dining information
                  </h1>
                  <p className="important-info-text">
                    We have a 20 minute grace period. Please call us if you are
                    running later than 20 minutes after your reservation time.
                    <br />
                    <br />
                    We may contact you about this reservation, so please ensure
                    your email and phone number are up to date.
                    <br />
                    <br />
                    Your table will be reserved for 1 hour 30 minutes for
                    parties of up to 2; and 2 hours for parties of 3+.
                  </p>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReservationConfirmForm;
