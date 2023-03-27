import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import LoginForm from "../../LoginFormModal/LoginForm";
import "./ReservationForm.css";

const ReservationForm = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const sessionUser = useSelector((state) => state.session.user);

  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("19:30");

  const [displayTime, setDisplayTime] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const update = (field) => {
    return (e) => {
      switch (field) {
        case "partySize":
          setPartySize(e.target.value);
          break;
        case "date":
          setDate(e.target.value);
          break;
        case "time":
          setTime(e.target.value);
          break;
        default:
          break;
      }
    };
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      setShowModal(true);
    } else {
      setDisplayTime(true);
      setShowModal(false);
    }
  };

  const convertTime = (timeString) => {
    const hour = parseInt(timeString.slice(0, 2));
    const minute = timeString.slice(3, 5);
    const meridian = hour >= 12 ? "PM" : "AM";
    const newHour = hour % 12 || 12;
  
    return `${newHour}:${minute} ${meridian}`;
  }

  return (
    <article className="reservation-form-container">
      <h2 className="make-a-reservation">Make a reservation</h2>
      <div className="reservation-form">
        <div className="party-size-picker">
          <label htmlFor="party-size" className="party-size-label">
            Party Size
          </label>
          <div className="party-size-select-holder">
            <select
              className="party-size-select"
              defaultValue="2"
              onChange={update("partySize")}
            >
               {[...Array(20)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} {i === 0 ? "person" : "people"}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <form className="reservation-form-box">
          <br />

          <div className="reservation-form-input">
            <br />

            <label>
              Time
              <br />
              <input
                className="reservation-input-time"
                type="time"
                value={time}
                onChange={update("time")}
              />
            </label>
            <br />

            <label>
              Date
              <br />
              <input
                className="reservation-input-date"
                value={date}
                min={date}
                type="date"
                onChange={update("date")}
              />
            </label>
            <br />

            {displayTime ? (
              <Link
                to={{
                  pathname: "/reservation/details",
                  state: {
                    party_size: partySize,
                    date: date,
                    time: time,
                    restaurant: restaurant,
                    current_user: sessionUser,
                  },
                }}
              >
                <input type="submit" value={convertTime(time)} />
              </Link>
            ) : (
              <input
                className="reservation-input-submit"
                type="submit"
                value="Find a table"
                onClick={handleClick}
              />
            )}
          </div>
        </form>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        )}
      </div>
    </article>
  );
};

export default ReservationForm;
