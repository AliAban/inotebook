import React, { useState, useContext} from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Signup = () => {

  const context = useContext(noteContext);
  const  {showAlert} = context;

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if(credentials.cPassword !== credentials.password){
      return alert("passwords do not match");
    }
    const response = await fetch("http://localhost:3000/api/auth/createUser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      console.log(json);
      navigate("/login");
      showAlert("Account Created successfully!", "success");
    }else{
      showAlert(json.error, "warning");
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form className="my-5" onSubmit={handleSignupSubmit}>
        <legend className="text-center">Signup</legend>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={handleOnChange}
            value={credentials.name}
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            minLength={3}
          />
        </div>
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
            required
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
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={handleOnChange}
            value={credentials.cPassword}
            type="password"
            className="form-control"
            id="cPassword"
            name="cPassword"
            required
            minLength={3}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
