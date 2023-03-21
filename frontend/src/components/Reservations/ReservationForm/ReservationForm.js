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

  const convertTime = (time) => {
    let newTime = "";
    let hour = parseInt(time.slice(0, 2));
    if (hour >= 12) {
      hour -= 12;
      newTime = hour + time.slice(2, 6) + " PM";
    } else {
      newTime = hour + time.slice(2, 6) + " AM";
    }
    return newTime;
  };

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
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5 people</option>
              <option value="6">6 people</option>
              <option value="7">7 people</option>
              <option value="8">8 people</option>
              <option value="9">9 people</option>
              <option value="10">10 people</option>
              <option value="11">11 people</option>
              <option value="12">12 people</option>
              <option value="13">13 people</option>
              <option value="14">14 people</option>
              <option value="15">15 people</option>
              <option value="16">16 people</option>
              <option value="17">17 people</option>
              <option value="18">18 people</option>
              <option value="19">19 people</option>
              <option value="20">20 people</option>
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
                    currentUser: sessionUser,
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
