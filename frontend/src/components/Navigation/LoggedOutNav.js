import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function LoggedOutNav({}) {
  return (
    <div>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
          <SignupFormModal />
          <LoginFormModal />
        </li>
      </ul>
    </div>
  );
}

export default LoggedOutNav;

// set up left nav bar, set up mid nav bar
// rightNavBarLoggedOut
// rightNavBarLoggedIn
