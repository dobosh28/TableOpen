import { useSelector } from "react-redux";
import LoggedInNav from "./LoggedInNav/LoggedInNav";
import LoggedOutNav from "./LoggedOutNav/LoggedOutNav";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {sessionUser ? (
        <LoggedInNav sessionUser={sessionUser} />
      ) : (
        <LoggedOutNav sessionUser={sessionUser} />
      )}
    </>
  );
};

export default NavBar;