import React from "react";
import { Link } from "react-router-dom";
import logo from "../pictures/taxonomy.jpg"; // with import
import ftpPicture from "../pictures/ftp_ncbi.jpg";
import linePicture from "../pictures/Carl_von_Linne.jpg"; // with
class Homepage extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <main>
          <section className="py-2 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Tzakos Taxonomy</h1>
                <p className="lead text-muted">
                  Εργασία: «Ανάπτυξη εφαρμογής Web για την πλοήγηση, την
                  αναζήτηση και τη διαχείριση βιολογικών δεδομένων »
                </p>

                <p>
                  <Link to="/search" className="btn btn-primary my-2">
                    Go to Taxonomy
                  </Link>
                </p>
              </div>
            </div>
          </section>

          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div className="col">
                  <div className="card shadow-sm">
                    <img
                      className="card-img-top"
                      src={logo}
                      alt="NCBI TAXONOMY"
                      width="100%"
                      height="190"
                    ></img>
                    <div className="card-body">
                      <p className="card-text">
                        The Taxonomy Database is a curated classification and
                        nomenclature for all of the organisms in the public
                        sequence databases. This currently represents about 10%
                        of the described species of life on the planet. .
                      </p>
                    </div>

                    <div className="card-body row justify-content-center">
                      <p className="card-text">
                        {" "}
                        <a
                          class="class"
                          href="https://www.ncbi.nlm.nih.gov/taxonomy/"
                          id="id"
                        >
                          NCBI TAXONOMY
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card shadow-sm">
                    <img
                      className="card-img-top"
                      src={ftpPicture}
                      alt="NCBI FTP"
                      width="100%"
                      height="209"
                    ></img>
                    <div className="card-body">
                      <p className="card-text">
                        NCBI Taxonomy database dump files. Τα αρχεία που
                        χρησιμοποιήσαμε για την δημιουργία της DB που
                        χρησιμοποιεί η Web εφαρμογή Tzakos Taxonomy
                      </p>
                    </div>

                    <div className="card-body row justify-content-center">
                      <p className="card-text">
                        {" "}
                        <a
                          class="class"
                          href="https://ftp.ncbi.nih.gov/pub/taxonomy/new_taxdump/"
                          id="id"
                        >
                          NCBI Taxonomy FTP
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card shadow-sm">
                  <img
                    className="card-img-top"
                    src={linePicture}
                    alt="NCBI TAXONOMY"
                    width="100%"
                    height="189"
                  ></img>
                  <div className="card-body">
                    <p className="card-text">
                      Ο Καρλ Λινέ (Carl von Linné ή εξελληνισμένα Κάρολος
                      Λινναίος (Ρόσουλτ 23 Μαΐου 1707 – Ουψάλα 10 Ιανουαρίου
                      1778) ήταν Σουηδός βοτανολόγος, ιατρός και ζωολόγος, που
                      έβαλε τα θεμέλια της διωνυμικής ονοματολογίας.
                    </p>
                  </div>

                  <div className="card-body row justify-content-center">
                    <p className="card-text">
                      {" "}
                      <a
                        class="class"
                        href="https://el.wikipedia.org/wiki/%CE%9A%CE%AC%CF%81%CE%BF%CE%BB%CE%BF%CF%82_%CE%9B%CE%B9%CE%BD%CE%BD%CE%B1%CE%AF%CE%BF%CF%82"
                        id="id"
                      >
                        Κάρολος Λινναίος
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Homepage;
