import { useSelector } from "react-redux";
import { getReservations, fetchReservations } from "../../store/reservations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import "./DiningDashboard.css";

const DiningDashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const reservations = useSelector(getReservations);
  const userId = sessionUser.id;
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === userId
  );

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  console.log(location.pathname);
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
              <li className={location.pathname === "/user/3/dining-dashboard" ? "dining-dashboard-li-bold" : "dining-dashboard-li"}>Reservations</li>
              <li className="dining-dashboard-li">Saved Restaurants</li>
              <li className="dining-dashboard-li">Account Details</li>
              <li className="dining-dashboard-li">Preferences</li>
              <li className="dining-dashboard-li">Payment Methods</li>
            </ul>
          </nav>
          <div className="dining-dashboard-right">
            <div className="dining-points">
              <header className="dining-points-header">
                <h2 className="dining-points-header-title">Points</h2>
                <div className="your-points">
                  <span>Your Points: 0 PTS</span>
                </div>
              </header>
              <div className="dining-points-body">
                <hr />
                <main>
                  <section className="dining-points-section-1">
                    <h5>Earned</h5>
                    <span>0</span> PTS
                  </section>
                  <section className="dining-points-section-2">
                    <h5>Next Reward</h5>
                    <span>1,000</span> PTS
                  </section>
                </main>
                <div className="points-progress-bar">
                  <div style={{ height: "1rem", width: "100%" }}>
                    <div
                      style={{
                        background: "#f1f2f4",
                        boxSizing: "border-box",
                        overflow: "hidden",
                        padding: "0",
                        borderRadius: "0.5rem",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "calc(0% + 16px)",
                          maxWidth: "calc(100% - 16px)",
                          background: "#da3743",
                          borderRadius: "0.5rem",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <span className="youre-1000-points-away">You are only 1,000 points away from a $20 reward!</span>
              </div>
              <div className="dining-points-footer">
                <hr />
                <p>Learn more about TableOpen Rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiningDashboard;
