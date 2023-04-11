import { NavLink } from "react-router-dom";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";
import "./LoggedOutNav.css";
import logo from "../../../icons/logo.png";

const LoggedOutNav = () => {
  return (
    <>
      <div className="logged-out-nav-bar">
        <div className="left-nav-bar">
          <div className="logo-container">
            <div className="logo">
              <NavLink exact to="/" className="nav-link">
                <img src={logo} className="logo" alt="" />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="right-nav-bar">
          <div className="sign-in-out-container">
            <SignupFormModal />
            <LoginFormModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggedOutNav;
