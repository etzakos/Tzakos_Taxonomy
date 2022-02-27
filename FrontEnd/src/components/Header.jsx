import React from "react";
import { Link } from "react-router-dom";

// props = {
//   user: {
//     userName: "e.tzakos",
//     role: "RO",
//     iat: 3242342344,
//   },
//   date: "24/4/20",
//   mitsos: 5,
// };

function isAdmin(user) {
  return user.role === "RW" ? "Admin" : "Read Only User";
}

const Header = ({ user }) => {
  return (
    // <body className={"d-flex flex-column min-vh-100"}>

    <nav className="navbar-fixed-bottom navbar-expand-lg navbar-light bg-light  ">
      <Link to="/" className="navbar-brand">
        Tzakos Taxonomy
      </Link>

      <ul class="nav navbar-nav navbar-right">
        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </ul>

      <div className="collapse navbar-collapse  " id="navbarSupportedContent">
        <ul className="navbar-nav ">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>{" "}
            </Link>
          </li>
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item mr-auto">
                <span className="nav-link">
                  {user.userName + " | " + isAdmin(user)}
                </span>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
    //body
  );
};

export default Header;
