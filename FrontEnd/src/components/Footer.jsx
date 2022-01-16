import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-muted py-4">
      <div className="container">
        <p className="float-end mb-1">
          <Link to="#">Back to top</Link>
        </p>
        <p className="mb-1">
          Album example is &copy; Bootstrap, but please download and customize
          it for yourself!
        </p>
        <p className="mb-0">
          New to Bootstrap? <Link to="/">Visit the homepage</Link> or read our{" "}
          <Link to="/docs/5.0/getting-started/introduction/">
            getting started guide
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
