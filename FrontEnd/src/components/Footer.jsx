import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-muted text-center mt-auto ">
      <div className="container fixed-bottom ">
        {/* <div className="container navbar-fixed-bottom "> fix issuw with mob but issue with page*/}
        {/*style={{ bottom: "0", position: "fixed" }} */}

        <p className="float-end mb-1">
          <Link to="#">Back to top</Link>
        </p>
        <p className="mb-1">
          &copy; Tzakos Taxonomy 2022 (based on NCBI Taxonomy DB)
        </p>
        <p className="mb-0">
          Αρχιτεκτονική Εφαρμογών Διαδικτύου και Βιοπληροφορική.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
