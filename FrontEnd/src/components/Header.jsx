import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a href="#" className="navbar-brand">
        Tzakos Taxonomy
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a href="#" className="nav-link">
              Home <span className="sr-only">(current)</span>{" "}
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link">
              Link
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
