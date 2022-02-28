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

    <React.Fragment>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Tzakos Taxonomy
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
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
                  <li className="nav-item">
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
        </div>
      </nav>
      <div className="pb-5"></div>
    </React.Fragment>
  );
};

export default Header;
