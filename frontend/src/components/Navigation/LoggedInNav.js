import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

function LoggedInNav({ sessionUser }) {
  return (
    <div style={{ width: "33%", height: "100%"}}>
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        <ProfileButton user={sessionUser} />
      </li>
    </ul>
    </div>
  );
}

export default LoggedInNav;
