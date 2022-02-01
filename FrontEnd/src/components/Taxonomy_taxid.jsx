import { Component } from "react";
import httpService from "../services/httpService";
import { Link } from "react-router-dom";
import ClipBoardIcon from "./common/ClipBoardIcon";
import _ from "lodash";

class Taxonomy_taxid extends Component {
  state = {
    myData: [],
    showModal: false,
    scientificName: "",
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  async componentDidMount() {
    let id = this.props.match.params.id;
    const { data } = await httpService.get(
      `http://localhost:3001/api/taxonomy_taxid/${id}`
    );
    this.setState({ myData: data }, () => {
      const objectFound = _.find(data, { name_class: "scientific name" });
      console.log("Data", this.state.myData);
      //this.setState({ scientificName: objectFound[0].name_txt });
    });
  }

  render() {
    return (
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-lg-1 col-sm-1"></div>
        <div className="col-lg-10 col-sm-10">
          <h4>Scientific Name: {this.state.scientificName}</h4>
          <div className="py-5 text-center">
            <h2>
              <span style={{ color: "#3f33ff" }}>Scientific Name</span>:{" "}
              {this.state.scientificName}
            </h2>
          </div>
          <label>
            Name:
            <input type="text" name="name" />
          </label>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tax_ID</th>
                <th scope="col">Rank</th>
                <th scope="col">Embl_Code</th>
                <th scope="col">Name/Synonyms</th>
                <th scope="col">Genetic_code_id</th>
                <th scope="col">Parent Tax_ID</th>
                <th scope="col">Name Class</th>
              </tr>
            </thead>
            <tbody>
              {this.state.myData.map((row) => (
                <tr key={row.id}>
                  <td>{row.tax_id}</td>
                  <td>{row.rank_id}</td>
                  <td>{row.embl_code}</td>
                  <td>{row.name_txt}</td>
                  <td>
                    <Modal
                      show={this.state.showModal}
                      handleClose={this.hideModal}
                    >
                      <div style={{ borderBottom: "1px solid black" }}>
                        <h4>Genetic Code ID</h4>
                        <p style={{ cursor: "pointer" }}>
                          {row.cde} <ClipBoardIcon text={row.cde} />
                        </p>
                      </div>
                    </Modal>
                    <button type="button" onClick={this.showModal}>
                      {row.genetic_code_id}
                    </button>
                  </td>
                  <td>
                    <Link to={`/taxonomy_parent/${row.parent_tax_id}`}>
                      {row.parent_tax_id}
                    </Link>
                  </td>
                  <td>{row.name_class}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="col-lg-1 col-sm-1"></div>
          <h4>
            <span style={{ color: "#ff0000" }}>Lineage:</span>Lineage:{" "}
            {this.state.scientificName}
          </h4>
        </div>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal display-block text-center"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose} style={{ margin: "20px" }}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Taxonomy_taxid;
