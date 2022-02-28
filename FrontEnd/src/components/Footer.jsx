import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="pt-3"></div>
      <footer className="text-center text-white">
        <div className="text-center fixed-bottom bg-secondary py-3">
          {/* <div className="container navbar-fixed-bottom "> fix issuw with mob but issue with page*/}
          {/*style={{ bottom: "0", position: "fixed" }} */}

          <p className="mb-1">
            &copy; Tzakos Taxonomy 2022 (based on NCBI Taxonomy DB)
          </p>
          <p className="mb-0">
            Αρχιτεκτονική Εφαρμογών Διαδικτύου και Βιοπληροφορική.
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
