import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Navbar = () => {
  const context = useContext(noteContext);
  const { userData, getUserData } = context;
  //used to redirect to different pages
  let navigate = useNavigate();

  //used to change the active class in links home and about
  let location = useLocation();

  useEffect(() => {
    getUserData();
  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    let logoutResponse = prompt("Logout", "yes");
    if (logoutResponse === "yes") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      return;
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          i-NoteBook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {location.pathname === "/" && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to={"/about"}
              >
                About
              </Link>
            </li> */}
          </ul>}
          
          { localStorage.getItem("token") && <div className="dropdown text-white mx-3">
            <a
              className="text-white dropdown-toggle text-decoration-none"
              id="dropdownButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              role="button"
            >
              <i className="far fa-user rounded-circle border p-1 mx-2 border-white"></i>
              {userData.name}
            </a>
            <div className="dropdown-menu dropdown-menu-end " aria-labelledby="dropdownButton">
              <a className="dropdown-item text-primary" href="#" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>}
          <form className="d-flex" role="search">
            {!localStorage.getItem("token") && (
              <Link className="btn btn-primary mx-2" to={"/login"}>
                Login
              </Link>
            )}
            {!localStorage.getItem("token") && (
              <Link className="btn btn-primary mx-2" to={"/signup"}>
                Signup
              </Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
