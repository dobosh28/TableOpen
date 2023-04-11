import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

const ProfileButton = ({ user }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  const routeToDiningDashboard = () => {
    history.push(`/user/${sessionUser.id}/dining-dashboard`);
  };

  const routeToFavorites = () => {
    history.push(`/user/${sessionUser.id}/dining-dashboard?tab=favorites`);
  };

  return (
    <>
      <button className="pfib" onClick={openMenu}>
        <div className="inside-button-div">
          <span>
            <svg viewBox="0 0 24 24" focusable="false">
              <g fill="none" fillRule="evenodd">
                <path
                  d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z"
                  fill="#2D333F"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <span className="dropdown-greeting">Hello, {user.firstName}!</span>
          <div className="dropdown-points">
            <div className="dropdown-points-top">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    color: "#999",
                    fontSize: "10px",
                    marginBottom: "4px",
                  }}
                >
                  Earned
                </div>
                <div
                  style={{
                    color: "#2d333f",
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  0
                  <span
                    style={{
                      color: "#999",
                      fontSize: "13px",
                      fontWeight: "300",
                      marginLeft: ".125rem",
                    }}
                  >
                    PTS
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    color: "#999",
                    fontSize: "10px",
                    marginBottom: "4px",
                  }}
                >
                  Next rewards
                </div>
                <div
                  style={{
                    color: "#2d333f",
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  2,000
                  <span
                    style={{
                      color: "#999",
                      fontSize: "13px",
                      fontWeight: "300",
                      marginLeft: ".125rem",
                    }}
                  >
                    PTS
                  </span>
                </div>
              </div>
            </div>
            <div className="dropdown-points-middle"></div>
            <div className="dropdown-points-bottom">
              <button>Learn more about points</button>
            </div>
          </div>
          <button className="my-button">My Profile</button>
          <button className="my-button" onClick={routeToDiningDashboard}>
            My Dining History
          </button>
          <button className="my-button" onClick={routeToFavorites}>
            My Saved Restaurants
          </button>

          <button className="my-button-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileButton;
