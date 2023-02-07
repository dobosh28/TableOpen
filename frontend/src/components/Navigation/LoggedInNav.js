import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

function LoggedInNav({ sessionUser }) {
  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        <ProfileButton user={sessionUser} />
      </li>
    </ul>
  );
}

export default LoggedInNav;
