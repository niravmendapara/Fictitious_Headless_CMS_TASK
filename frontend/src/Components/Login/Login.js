import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import admnDataService from "../../Service/admnDataService";
import "./Login.css";

function Login(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Please Enter all Required Data.");
    } else {
      admnDataService
        .login(username, password)
        .then((response) => {
          if (response.status === 200) {
            setError("");
            console.log(response.data.token);
            localStorage.setItem("TOKEN", response.data.token);
            navigate("/");
          } else {
            setError("Invalid Username or Password !!");
          }
        })
        .catch((error) => {
          setError("Invalid Username or Password !!");
        });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
