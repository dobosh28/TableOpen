import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (Object.keys(newErrors).length === 0) {
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
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>
        <input
          className={`signup-input ${errors.firstName && 'invalid-input'}`}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First name"
        />
        {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
      </label>
      <label>
        <input
          className={`signup-input ${errors.lastName && 'invalid-input'}`}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last name"
        />
        {errors.lastName && (
          <span className="error-message">{errors.lastName}</span>
        )}
      </label>
      <label>
        <input
          className={`signup-input ${errors.email && 'invalid-input'}`}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </label>
      <label>
        <input
          className={`signup-input ${errors.password && 'invalid-input'}`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </label>
      <label>
        <input
          className={`signup-input ${errors.confirmPassword && 'invalid-input'}`}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </label>
      <button type="submit" className="sign-up-form-button">
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
