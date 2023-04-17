import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LoggedInNav from "./LoggedInNav/LoggedInNav";
import LoggedOutNav from "./LoggedOutNav/LoggedOutNav";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

  const isDiningDashboard =
    location.pathname.includes("dining") ||
    location.pathname.includes("reservation/details") ||
    location.pathname.includes("/confirmation") ||
    location.pathname.includes("/modify");

  return (
    <nav className="navvy-nav">
      <div className="above-nav" style={{ fontWeight: "400" }}>
        <div className="above-nav-for-businesses">For Businesses</div>
        <div className="above-nav-mobile">
          <button className="above-nav-mobile-button">Mobile</button>
        </div>
        <div className="above-nav-faqs">FAQs</div>
        <div className="above-nav-language">
          <button className="above-nav-language-button">EN</button>
        </div>
      </div>
      {sessionUser ? (
        <LoggedInNav sessionUser={sessionUser} />
      ) : (
        <LoggedOutNav sessionUser={sessionUser} />
      )}
      {isDiningDashboard ? null : (
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
