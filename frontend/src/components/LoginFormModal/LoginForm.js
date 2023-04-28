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
