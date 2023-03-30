import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReservation } from "../../../store/reservations";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { logout } from "../../../store/session";
import { receiveReservation } from "../../../store/reservations";
import "./ReservationConfirmForm.css";

const ReservationConfirmForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { restaurant, current_user } = location.state;

  const [reservationData, setReservationData] = useState({
    party_size: 2,
    date: "",
    time: "",
    user_id: "",
    restaurant_id: restaurant.id,
    email: current_user.email,
    phone_number: "",
    special_request: "",
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
        party_size: party_size,
        date: date,
        time: time,
        user_id: current_user.id,
      }));
    }
  }, [current_user, history, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservation = {
      ...reservationData,
    };
    const newReservation = await dispatch(createReservation(reservation));
    dispatch(receiveReservation(newReservation));
    history.push(`/reservations/${newReservation.id}/confirmation`);
  };

  const update = (field) => {
    return (e) => {
      setReservationData((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    };
  };

  const convertTime = (timeString) => {
    if (timeString === "") {
      return "";
    }

    const hour = parseInt(timeString.slice(0, 2));
    const minute = timeString.slice(3, 5);
    const meridian = hour >= 12 ? "PM" : "AM";
    const newHour = hour % 12 || 12;

    return `${newHour}:${minute} ${meridian}`;
  };

  const routeToRestaurant = () => {
    history.push(`/restaurants/${restaurant.id}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(`/restaurants/${restaurant.id}`);
  };

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
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
                  <img
                    src={restaurant.photoUrl}
                    className="restaurant-photo"
                    alt=""
                  />
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
                          <p>{formatDate(reservationData.date)}</p>
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
                {current_user.firstName} {current_user.lastName} (
                <span onClick={handleLogout}>
                  Not {current_user.firstName}?
                </span>
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
                        onChange={update("phone_number")}
                      />
                    </div>
                  </div>
                  <div className="form-inputs__email">
                    <div className="email-div">
                      <input
                        className="email-input"
                        value={current_user.email}
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
