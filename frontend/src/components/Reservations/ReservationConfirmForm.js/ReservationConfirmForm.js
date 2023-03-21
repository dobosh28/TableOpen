import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReservation } from "../../../store/reservations";
import { useLocation, useHistory } from "react-router-dom";

const ReservationConfirmForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [partySize, setPartySize] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState("1234567890");
  const [specialRequest, setSpecialRequest] = useState("");
  const [occasion, setOccasion] = useState("");

  const { restaurant, currentUser } = location.state;

  useEffect(() => {
    if (!location.state) {
      history.push("/");
      window.location.reload();
    } else {
      const { party_size, date, time } = location.state;
      setPartySize(party_size);
      setDate(date);
      setTime(time);
      setRestaurantId(restaurant.id);
      setUserId(currentUser.id);
      setEmail(currentUser.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservation = {
      party_size: partySize,
      date: date,
      time: time,
      restaurant_id: restaurantId,
      user_id: userId,
      email: email,
      phone_number: phone,
      special_request: specialRequest,
      occasion: occasion,
    };
    const newReservation = await dispatch(
      createReservation(reservation, restaurantId)
    );
    history.push(`/reservation/view/${newReservation.id}`);
  };

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
        case "email":
          setEmail(e.target.value);
          break;
        case "phone":
          setPhone(e.target.value);
          break;
        case "specialRequest":
          setSpecialRequest(e.target.value);
          break;
        case "occasion":
          setOccasion(e.target.value);
          break;
        default:
          break;
      }
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

  return (
    <div className="reservation-confirm-form">
      <h1>You're almost done!</h1>
      <br />

      <div className="reservation-confirm-form__info">
        <img src={restaurant.photoUrl} />
        <h2>{restaurant.name}</h2>
        <p>{partySize}</p>
        <p>{date}</p>
        <p>{convertTime(time)}</p>
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
        <input type="email" value={currentUser.email} readOnly />
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
            <span>TableOpen Terms of Use</span> and <span>Privacy Policy</span>.{" "}
          </p>
        </div>
      </form>
      <div className="reservation-confirm-form-note">
        <h3>What to know before you go</h3>
        <h4>Important dining information</h4>
        <p>
          We may contact you about this reservation, so please ensure your email
          and phone number are up to date.
        </p>
      </div>
    </div>
  );
};

export default ReservationConfirmForm;
