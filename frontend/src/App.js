import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import Navigation from './components/Navigation';
import LoggedInNav from "./components/Navigation/LoggedInNav/LoggedInNav";
import LoggedOutNav from "./components/Navigation/LoggedOutNav/LoggedOutNav";

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {sessionUser ? (
        <LoggedInNav sessionUser={sessionUser} />
      ) : (
        <LoggedOutNav sessionUser={sessionUser} />
      )}
      <Switch></Switch>
    </>
  );
}

export default App;
