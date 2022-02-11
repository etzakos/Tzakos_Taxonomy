import { Component } from "react";
import httpService from "../services/httpService";
import { Link } from "react-router-dom";
import ClipBoardIcon from "./common/ClipBoardIcon";
import _ from "lodash";

class Taxonomy_taxid extends Component {
  state = {
    myData: [],
    showModal: false,
    showModalDeletion: false,
    scientificName: "",
    lineAge: "",
    modalDeletionRowData: {},
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  showModalDeletion = (row) => {
    this.setState({ modalDeletionRowData: row, showModalDeletion: true });
  };

  hideModalDeletion = () => {
    this.setState({ showModalDeletion: false });
  };

  async componentDidMount() {
    let id = this.props.match.params.id;
    const { data } = await httpService.get(
      `http://localhost:3001/api/taxonomy_taxid/${id}`
    );
    this.setState({ myData: data }, () => {
      const objectFound = _.find(data, { name_class: "scientific name" });
      this.setState({
        scientificName: objectFound.name_txt,
        lineAge: objectFound.lineage,
      });
    });
  }

  handleDeletion = async (item) => {
    await httpService.delete(`http://localhost:3001/api/taxonomy_taxid`, {
      data: item,
    });

    let copyOfMyData = this.state.myData;
    let filtered = copyOfMyData.filter((i) => i !== item);

    this.setState({ myData: filtered });

    this.setState({ showModalDeletion: false });
  };

  render() {
    return (
      <div style={{ height: "100vw" }} className="bg-light mx-auto mt-4 p-2">
        <ModalDeletion
          show={this.state.showModalDeletion}
          handleClose={this.hideModalDeletion}
          lineData={this.state.modalDeletionRowData}
          handleDeletion={this.handleDeletion}
        />
        <h4 className="display-5">
          Scientific Name: {this.state.scientificName}
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tax_ID</th>
              <th scope="col">Rank</th>
              <th scope="col">Embl_Code</th>
              <th scope="col">Name/Synonyms</th>
              <th scope="col">Genetic_code_id</th>
              <th scope="col">Genetic Name</th>
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

                  <button
                    className="btn btn-info btn-sm"
                    type="button"
                    onClick={this.showModal}
                  >
                    {row.genetic_code_id}
                  </button>
                </td>
                <td>{row.name}</td>
                <td>
                  <Link to={`/taxonomy_parent/${row.parent_tax_id}`}>
                    {row.parent_tax_id}
                  </Link>
                </td>
                <td>{row.name_class}</td>
                <td>
                  <button className="btn btn-primary">update</button>
                </td>
                <td>
                  {row.name_class === "scientific name" ? (
                    ""
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => this.showModalDeletion(row)}
                    >
                      delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-lg-1 col-sm-1"></div>
        <h4 className="lead">
          <span style={{ color: "#ff0000" }}>Lineage: </span>
          {this.state.lineAge}
        </h4>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal display-block text-center opacity-100"
    : "modal display-none";

  return (
    <div
      className={showHideClassName}
      style={{ background: "rgba(0, 0, 0, 0.03)" }}
    >
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose} style={{ margin: "20px" }}>
          Close
        </button>
      </section>
    </div>
  );
};

const ModalDeletion = ({ handleClose, handleDeletion, show, lineData }) => {
  const showHideClassName = show
    ? "modal display-block text-center"
    : "modal display-none";

  return (
    <div
      className={showHideClassName}
      style={{ background: "rgba(0, 0, 0, 0.03)" }}
    >
      <section className="modal-main bg-light">
        <h3>Are you sure you want to delete the below synonym ?</h3>
        <div>
          <table className="mx-auto">
            <thead>
              <tr>
                <th>Tax_ID</th>
                <th>Rank</th>
                <th>Name/Synonym</th>
                <th>Genetic Name</th>
                <th>Parent Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{lineData.tax_id}</td>
                <td>{lineData.rank_id}</td>
                <td className="text-danger">{lineData.name_txt}</td>
                <td>{lineData.name}</td>
                <td>{lineData.parent_tax_id}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={() => handleDeletion(lineData)}
            className="btn btn-danger btn-lg m-5"
          >
            Yes
          </button>
          <button className="btn btn-primary btn-lg m-5" onClick={handleClose}>
            No
          </button>
        </div>
      </section>
    </div>
  );
};

export default Taxonomy_taxid;
