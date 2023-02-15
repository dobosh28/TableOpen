import { NavLink } from "react-router-dom";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";
import "./LoggedOutNav.css";
import logo from "../../../icons/logo.png";

function LoggedOutNav({}) {

  return (
    <nav className="logged-out-nav">
      <div className="above-nav">
        <div className="above-nav-for-businesses">For Businesses</div>
        <div className="above-nav-mobile">Mobile</div>
        <div className="above-nav-faqs">FAQs</div>
        <div className="above-nav-language" >
          <span>EN</span>
        </div>
      </div>
      <div className="logged-out-nav-bar">
        <div className="left-nav-bar" >
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
    </nav>
  )
}

export default LoggedOutNav;

