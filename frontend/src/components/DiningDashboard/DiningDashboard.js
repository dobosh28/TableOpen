import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import DiningDashboardReservations from "./DiningDashboardReservations";
import DiningDashboardFavorites from "./DiningDashboardFavorites";

import "./DiningDashboard.css";

const DiningDashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);

  const routeToDiningDashboard = () => {
    history.push(`/user/${sessionUser.id}/dining-dashboard`);
  };

  const routeToFavorites = () => {
    history.push(`/user/${sessionUser.id}/dining-dashboard?tab=favorites`);
  };

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
      <div style={{ backgroundColor: "rgb(247, 247, 247)" }}>
        <div className="dining-dashboard-content">
          <nav>
            <ul className="dining-dashboard-ul">
              <li
                onClick={routeToDiningDashboard}
                className={
                  !params.has("tab")
                    ? "dining-dashboard-li-bold"
                    : "dining-dashboard-li"
                }
              >
                Reservations
              </li>
              <li
                onClick={routeToFavorites}
                className={
                  params.get("tab") === "favorites"
                    ? "dining-dashboard-li-bold"
                    : "dining-dashboard-li"
                }
              >
                Saved Restaurants
              </li>
              <li className="dining-dashboard-li">Account Details</li>
              <li className="dining-dashboard-li">Preferences</li>
              <li className="dining-dashboard-li">Payment Methods</li>
            </ul>
          </nav>
          {!params.has("tab") && <DiningDashboardReservations />}
          {params.get("tab") === "favorites" && <DiningDashboardFavorites />}
        </div>
      </div>
    </main>
  );
};

export default DiningDashboard;
