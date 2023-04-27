import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  const demoUserLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      sessionActions.login({ email: "demo@user.io", password: "123456" })
    );
  };

  return (
    <>
      <div>
        <div className="login-form-container">
          {/* <button className="close-auth-modal">
            <span className="close-auth-modal-button-span">
              <svg viewBox="0 0 24 24" focusable="false">
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M11,11 L11,4.5 C11,4.22385763 11.2238576,4 11.5,4 L12.5,4 C12.7761424,4 13,4.22385763 13,4.5 L13,11 L19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 L13,13 L13,19.5 C13,19.7761424 12.7761424,20 12.5,20 L11.5,20 C11.2238576,20 11,19.7761424 11,19.5 L11,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 L4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L11,11 Z"
                    fill="#2d333f"
                    fillRule="nonzero"
                    transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)"
                  ></path>
                </g>
              </svg>
            </span>
          </button> */}
          <div style={{ height: "100%" }}>
            <div className="login-form" onSubmit={handleSubmit}>
              <div>
                <h2 className="welcome-back">Welcome back!</h2>
                <p className="welcome-back-p">
                  {" "}
                  Please sign in to access your account or try our demo option
                  to explore TableOpen!
                </p>
                <form>
                  <div className="login-form-input-1">
                    <div
                      className={`login-form-input ${
                        errors.length > 0 ? "invalid-input" : ""
                      }`}
                    >
                      <input
                        className="signin-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="login-form-input-2">
                    <div
                      className={`login-form-input ${
                        errors.length > 0 ? "invalid-input" : ""
                      }`}
                    >
                      <input
                        className="signin-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                      />
                    </div>
                    <ul className="login-form-errors">
                      {errors.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>

                  <button type="submit" className="sign-in-form-button">
                    Sign In
                  </button>
                </form>
                <button onClick={demoUserLogin} className="demo-signin-button">
                  Use demo instead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
