import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Please enter your first name";
    if (!lastName.trim()) newErrors.lastName = "Please enter your last name";
    if (!email.trim()) newErrors.email = "Please enter your email address";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address";
    if (!password.trim()) newErrors.password = "Please enter a password";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      dispatch(
        sessionActions.signup({ email, firstName, lastName, password })
      ).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors({ server: data });
        else setErrors({ server: res.statusText });
      });
    }
  };

  return (
    <div>
      <div className="login-form-container">
        <div style={{ height: "100%" }}>
          <div className="login-form" onSubmit={handleSubmit}>
            <div>
              <h2 className="welcome-back">Welcome to TableOpen!</h2>
              <p className="welcome-back-p">
                {" "}
                Sign up now to explore and experience the best dining options in
                your area.
              </p>
              <form>
                <div className="login-form-input-1">
                  <div
                    className={`login-form-input ${
                      errors.firstName ? "invalid-input" : ""
                    }`}
                  >
                    <input
                      className="signin-input"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      placeholder="First name"
                    />
                  </div>
                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </div>
                <div className="login-form-input-1">
                  <div
                    className={`login-form-input ${
                      errors.lastName ? "invalid-input" : ""
                    }`}
                  >
                    <input
                      className="signin-input"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      placeholder="Last name"
                    />
                  </div>
                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </div>
                <div className="login-form-input-1">
                  <div
                    className={`login-form-input ${
                      errors.email ? "invalid-input" : ""
                    }`}
                  >
                    <input
                      className="signin-input"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>
                <div className="login-form-input-1">
                  <div
                    className={`login-form-input ${
                      errors.password ? "invalid-input" : ""
                    }`}
                  >
                    <input
                      className="signin-input"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>
                <div className="login-form-input-2">
                  <div
                    className={`login-form-input ${
                      errors.confirmPassword ? "invalid-input" : ""
                    }`}
                  >
                    <input
                      className="signin-input"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      placeholder="Confirm password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="sign-in-form-button"
                  onClick={validateForm}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
