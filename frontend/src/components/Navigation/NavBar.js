import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LoggedInNav from "./LoggedInNav/LoggedInNav";
import LoggedOutNav from "./LoggedOutNav/LoggedOutNav";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

  const CurrentLocationOff =
    location.pathname.includes("dining") ||
    location.pathname.includes("reservation/details") ||
    location.pathname.includes("/confirmation") ||
    location.pathname.includes("/modify") ||
    location.pathname.includes("/review");

  return (
    <nav className="navvy-nav">
      <div className="above-nav" style={{ fontWeight: "300" }}>
        <div className="above-nav-for-businesses">For Businesses</div>
        <div className="above-nav-mobile">
          <div className="above-nav-mobile-inner">Mobile</div>
        </div>
        <div className="above-nav-faqs">FAQs</div>
        <div className="above-nav-language">
          <div className="above-nav-language-inner">EN</div>
        </div>
      </div>
      {sessionUser ? (
        <LoggedInNav sessionUser={sessionUser} />
      ) : (
        <LoggedOutNav sessionUser={sessionUser} />
      )}
      {CurrentLocationOff ? null : (
        <ol className="current-location-ol">
          <li className="current-location-li">
            <p>Home</p>
          </li>
          <li className="current-location-li">
            <p style={{ color: "#2d333f" }}>United States</p>
          </li>
          <li className="current-location-li">
            <p>New York / Tri-State Area</p>
          </li>
          <li className="current-location-li">
            <p>Manhattan</p>
          </li>
        </ol>
      )}
    </nav>
  );
};

export default NavBar;
