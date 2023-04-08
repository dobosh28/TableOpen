import { useSelector } from "react-redux";
import { getReservations, fetchReservations } from "../../store/reservations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./DiningDashboard.css";

const DiningDashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const reservations = useSelector(getReservations);
  const userId = sessionUser.id;
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === userId
  );

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);
 
  return (
    <main className="dining-dahsboard-main" tabIndex="-1">
      <header className="dining-dashboard-header">
        <div className="dining-dashboard-header-inner">
          <h1 className="dining-dashboard-header-title">
            {sessionUser.firstName} {sessionUser.lastName}
          </h1>
          <p>0 points</p>
        </div>
      </header>
      <div style={{ backgroundColor: "#f1f2f4"}}>
        <div className="dining-dashboard-content">
          <nav>
            <ul className="dining-dashboard-ul">
              <li>Reservation</li>
              <li>Saved Restaurants</li>
              <li>Account Details</li>
              <li>Preferences</li>
              <li>Payment Methods</li>
            </ul>
          </nav>
          <div className="dining-dashboard-right">
           
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiningDashboard;
