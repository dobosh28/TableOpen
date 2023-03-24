import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
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

  return (
    <>
      <div className="profile-button" onClick={openMenu}>
        <i id="favicon" className="fa-sharp fa-regular fa-circle-user"></i>
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <span className="dropdown-greeting">Hello, {user.firstName}!</span>
          <button className="my-button">My Profile</button>
          <button className="my-button">My Dining History</button>
          <button className="my-button">My Saved Restaurants</button>

          <button className="my-button-logout" onClick={handleLogout}>Sign Out</button>
          
        </ul>
      )}
    </>
  );
};

export default ProfileButton;