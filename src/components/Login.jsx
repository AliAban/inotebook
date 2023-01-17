import React, { useContext, useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;

  // let location = useLocation;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // API CALL
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); //getting the response
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken); // setting the auth-token in local storage.
      showAlert("Logged in successfully!", "success");
      navigate("/"); // redirect to homepage
    } else {
      showAlert("Login Error!", "danger");
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form className="my-5" onSubmit={handleLoginSubmit}>
        <legend className="text-center">Login to continue</legend>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={handleOnChange}
            value={credentials.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={handleOnChange}
            value={credentials.password}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
