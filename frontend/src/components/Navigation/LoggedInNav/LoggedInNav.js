import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";
import "./LoggedInNav.css";
import logo from "../../../icons/logo.png";

function LoggedInNav({ sessionUser }) {
  // return (
  //   <ul>
  //     <li>
  //       <NavLink exact to="/">
  //         Home
  //       </NavLink>
  //       <ProfileButton user={sessionUser} />
  //     </li>
  //   </ul>
  // );

  return (
    <nav className="logged-in-nav">
      <div className="above-nav">
        <div className="above-nav-for-businesses">For Businesses</div>
        <div className="above-nav-mobile">Mobile</div>
        <div className="above-nav-faqs">FAQs</div>
        <div className="above-nav-language">
          <span>EN</span>
        </div>
      </div>
      <div className="logged-in-nav-bar">
        <div className="left-nav-bar">
          <div className="logo-container">
            <div className="logo">
              <NavLink exact to="/" className="nav-link">
                <img src={logo} className="logo" />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="right-nav-bar">
          <div className="profile-container">
            <div className="profile-button">
              <ProfileButton user={sessionUser} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default LoggedInNav;
