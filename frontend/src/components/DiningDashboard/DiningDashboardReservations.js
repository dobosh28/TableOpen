import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservations, fetchReservations } from "../../store/reservations";
import "./DiningDashboardReservations.css";

const DiningDashboardReservations = () => {
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
          <span className="youre-1000-points-away">
            You are only 1,000 points away from a $20 reward!
          </span>
        </div>
        <div className="dining-points-footer">
          <hr />
          <p>Learn more about TableOpen Rewards</p>
        </div>
      </div>
    </div>
  );
};

export default DiningDashboardReservations;
