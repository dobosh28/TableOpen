// move separate navbars here and perfrom logic to determine what navbars should be displayed
// navbar container div should be here. no height 

import { useSelector } from "react-redux"
import LeftNav from "./LeftNav"
import LoggedOutNav from "./LoggedOutNav"
import MiddleNav from "./MiddleNav/Middle.nav"
import LoggedInNav from "./LoggedInNav"

function NavBar() {
    const sessionUser = useSelector((state) => state.session.user)
    return (
        <div style={{ top: "0",
            position: "fixed",
            display: "flex",
            height: "50px",
            backgroundColor: "grey",
            width: "120%",
            boxShadow: "0px 0.5px 0.5px 0px darkgrey",
            display: "flex",
          }}>
            <LeftNav />
            <MiddleNav />
            {sessionUser ? <LoggedInNav sessionUser={sessionUser} /> : <LoggedOutNav />}

        </div>
    )

}

export default NavBar