import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import './reset.css';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as reviewActions from './store/reviews';
import * as reservationActions from './store/reservations';
import * as usersActions from './store/users';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.reviewActions = reviewActions;
  window.reservationActions = reservationActions;
  window.usersActions = usersActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem('X-CSRF-Token') === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication)
} else {
  renderApplication();
}
