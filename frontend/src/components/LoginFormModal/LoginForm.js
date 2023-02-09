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

  const demoUserLogin = () => {
    setEmail("demo@user.io");
    setPassword("password");
    dispatch(
      sessionActions.login({ email: "demo@user.io", password: "password" })
    );
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <ul className="login-form-erors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <div>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="signin-input"
        />
      </div>
      <div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="signin-input"
        />
        <button type="submit" className="sign-in-form-button">
          Sign In
        </button>
      </div>
      <div>
        <button onClick={demoUserLogin} className="demo-signin-button">
          Demo User
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
