import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function LoggedOutNav({}) {
  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        <LoginFormModal />
        <SignupFormModal />
      </li>
    </ul>
  );
}

export default LoggedOutNav;
