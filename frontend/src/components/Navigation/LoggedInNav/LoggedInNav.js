import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";
import "./LoggedInNav.css";
import "../Navigation.css";
import logo from "../../../icons/logo.png";

function LoggedInNav({ sessionUser }) {
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
                <img src={logo} className="logo" alt="" />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="logged-in-right-nav-bar">
          <div className="profile-calendar-container">
            <div className="profile-calendar">
              <div className="profile">
                <div className="profile-inner">
                  <ProfileButton user={sessionUser} />
                </div>
              </div>
              <div className="calendar-in-nav">
                <button>
                  <div></div>
                </button>
              </div>
            </div>
          </div>
          <div className="notif-bell">
            <div>
              <button>
                <div></div>
              </button>
            </div>
          </div>
          <div className="search-mg-nav">
            <button>
              <span>
                <svg viewBox="0 0 24 24" focusable="false">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M13,15.9291111 L13,21.5 C13,21.7761424 12.7761424,22 12.5,22 L11.5,22 C11.2238576,22 11,21.7761424 11,21.5 L11,15.9291111 C7.60770586,15.4438815 5,12.5264719 5,9 C5,5.13400675 8.13400675,2 12,2 C15.8659932,2 19,5.13400675 19,9 C19,12.5264719 16.3922941,15.4438815 13,15.9291111 Z M12,4 C9.23857625,4 7,6.23857625 7,9 C7,11.7614237 9.23857625,14 12,14 C14.7614237,14 17,11.7614237 17,9 C17,6.23857625 14.7614237,4 12,4 Z"
                      fillRule="nonzero"
                      fill="#2d333f"
                      transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000)"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LoggedInNav;
