import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginFormPage} />
    </Switch>
  );
}

export default App;
