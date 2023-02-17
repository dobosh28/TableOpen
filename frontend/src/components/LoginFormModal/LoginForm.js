import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginForm() {
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
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <h1>Welcome to TableOpen!</h1>
        <p>Enter the email...</p>
      </div>
      <br />
      <input
        className="signin-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <br />
      <input
        className="signin-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <ul className="login-form-erors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <button type="submit" className="sign-in-form-button">
        Sign In
      </button>
      <br />
      <button onClick={demoUserLogin} className="demo-signin-button">
        Demo User
      </button>
    </form>
  );
}

export default LoginForm;
