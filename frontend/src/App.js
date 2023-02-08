import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <NavBar />
      <Switch></Switch>
    </>
  );
}

export default App;
