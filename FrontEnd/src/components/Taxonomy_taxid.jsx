import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

import httpService from "../services/httpService";
import ClipBoardIcon from "./common/ClipBoardIcon";
import { apiUrl } from "../config.json";

import "react-toastify/dist/ReactToastify.css";

class Taxonomy_taxid extends Component {
  state = {
    myData: [],
    showModal: false,
    showModalDeletion: false,
    showModalUpdate: false,
    showModalInsert: false,
    scientificName: "",
    lineAge: "",
    modalDeletionRowData: {},
    modalUpdateRowData: {},
    modalUpdateSynonym: "",
    modalInsertSynonym: "",
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

  hideModalDeletion = (row) => {
    this.setState({ showModalDeletion: false });
  };

  showModalUpdate = (row) => {
    this.setState({
      modalUpdateRowData: row,
      modalUpdateSynonym: row.name_txt,
      showModalUpdate: true,
    });
  };

  hideModalUpdate = (row) => {
    this.setState({ showModalUpdate: false });
  };

  handleSynonymUpdate = (e) => {
    this.setState({ modalUpdateSynonym: e.target.value });
  };

  showModalInsert = () => {
    this.setState({
      showModalInsert: true,
    });
  };

  hideModalInsert = () => {
    this.setState({
      showModalInsert: false,
    });
  };

  setModalInsertSynonym = (e) => {
    this.setState({ modalInsertSynonym: e.target.value });
  };

  handleInsert = async () => {
    console.log(this.state.myData);
    const obj = _.find(this.state.myData, { name_class: "scientific name" });
    console.log("Object found", obj);

    const table = this.state.myData;

    table.unshift({
      tax_id: obj.tax_id,
      rank_id: obj.rank_id,
      embl_code: obj.embl_code,
      name_txt: this.state.modalInsertSynonym,
      genetic_code_id: obj.genetic_code_id,
      name: obj.name,
      parent_tax_id: obj.parent_tax_id,
      cde: obj.cde,
      id: this.state.myData.length + 1,
      name_class: "synonym",
      lineage: obj.lineAge,
    });

    this.setState({ myData: table, showModalInsert: false });

    try {
      await httpService.post(`${apiUrl}/insert_synonym`, {
        tax_id: obj.tax_id,
        rank_id: obj.rank_id,
        embl_code: obj.embl_code,
        name_txt: this.state.modalInsertSynonym,
        genetic_code_id: obj.genetic_code_id,
        name: obj.name,
        parent_tax_id: obj.parent_tax_id,
        cde: obj.cde,
        id: this.state.myData.length + 1,
        name_class: "synonym",
        lineage: obj.lineAge,
      });
    } catch (ex) {
      console.log("ERROR ", ex.response);
      toast.error("ERROR: " + ex.response.data);
    }
  };

  async componentDidMount() {
    let id = this.props.match.params.id;
    const { data } = await httpService.get(`${apiUrl}/taxonomy_taxid/${id}`);
    this.setState({ myData: data }, () => {
      const objectFound = _.find(data, { name_class: "scientific name" });
      this.setState({
        scientificName: objectFound.name_txt,
        lineAge: objectFound.lineage,
      });
    });
  }

  handleDeletion = async (item) => {
    let copyOfMyData = this.state.myData;
    console.log("132");
    try {
      let filtered = copyOfMyData.filter((i) => i !== item);
      this.setState({ myData: filtered, showModalDeletion: false });

      await httpService.delete(`${apiUrl}/taxonomy_taxid`, {
        data: {
          tax_id: item.tax_id,
          name_txt: item.name_txt,
        },
      });
    } catch (ex) {
      toast.error("ERROR: " + ex.response.data);

      setTimeout(() => {
        // Rollback of deletion in the site
        this.setState({ myData: copyOfMyData });
      }, 1500);
    }
  };

  handleUpdate = async (item, newValue) => {
    await httpService.patch(`${apiUrl}/taxonomy_taxid`, {
      data: [item, this.state.modalUpdateSynonym],
    });

    let copyOfMyData = this.state.myData;
    let index = copyOfMyData.findIndex((i) => i === item);
    copyOfMyData[index]["name_txt"] = this.state.modalUpdateSynonym;

    this.setState({ myData: copyOfMyData, showModalUpdate: false });
  };

  setModalUpdateSynonym = (e) => {
    this.setState({ modalUpdateSynonym: e.target.value });
  };

  render() {
    return (
      <div className="bg-light mx-auto mt-4 p-2">
        <ToastContainer />
        <ModalDeletion
          show={this.state.showModalDeletion}
          handleClose={this.hideModalDeletion}
          lineData={this.state.modalDeletionRowData}
          handleDeletion={this.handleDeletion}
        />
        <ModalUpdate
          show={this.state.showModalUpdate}
          handleClose={this.hideModalUpdate}
          lineData={this.state.modalUpdateRowData}
          handleUpdate={this.handleUpdate}
          modalUpdateSynonym={this.state.modalUpdateSynonym}
          setModalUpdateSynonym={this.setModalUpdateSynonym}
        />

        <ModalInsert
          show={this.state.showModalInsert}
          handleClose={this.hideModalInsert}
          handleInsert={this.handleInsert}
          modalInsertSynonym={this.state.modalInsertSynonym}
          setModalInsertSynonym={this.setModalInsertSynonym}
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
              <th>
                {this.props.user && (
                  <React.Fragment>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => this.showModalInsert()}
                      disabled={this.props.user.role === "RO" ? "disabled" : ""}
                    >
                      Insert Synonym
                    </button>
                  </React.Fragment>
                )}
              </th>
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
                {this.props.user && (
                  <React.Fragment>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.showModalUpdate(row)}
                        disabled={
                          this.props.user.role === "RO" ? "disabled" : ""
                        }
                      >
                        update
                      </button>
                    </td>
                    <td>
                      {row.name_class === "scientific name" ? (
                        ""
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => this.showModalDeletion(row)}
                          disabled={
                            this.props.user.role === "RO" ? "disabled" : ""
                          }
                        >
                          delete
                        </button>
                      )}
                    </td>
                  </React.Fragment>
                )}
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
  const showHiddenClassName = show
    ? "modal display-block text-center opacity-100"
    : "modal display-none";

  return (
    <div
      className={showHiddenClassName}
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
  const showHiddenClassName = show
    ? "modal display-block text-center"
    : "modal display-none";

  return (
    <div
      className={showHiddenClassName}
      style={{ background: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="modal-dialog" style={{ maxWidth: "60%" }}>
        <div className="modal-content m-3">
          <h3 className="m-3">
            Are you sure you want to delete the below synonym ?
          </h3>
          <div>
            <table className="table mx-auto">
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
                  <td className="text-danger font-weight-bold">
                    {lineData.name_txt}
                  </td>
                  <td>{lineData.name}</td>
                  <td>{lineData.parent_tax_id}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => handleDeletion(lineData)}
              className="btn btn-info btn-lg px-7 m-5"
            >
              Yes
            </button>
            <button
              className="btn btn-primary btn-lg px-7 m-5"
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalUpdate = ({
  handleClose,
  handleUpdate,
  show,
  lineData,
  modalUpdateSynonym,
  setModalUpdateSynonym,
}) => {
  const showHiddenClassName = show
    ? "modal display-block text-center"
    : "modal display-none";

  return (
    <div
      className={showHiddenClassName}
      style={{ background: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Synonym</h5>
            <button className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="username">Synonym</label>
                <input
                  type="text"
                  className="form-control"
                  value={modalUpdateSynonym}
                  onChange={(e) => setModalUpdateSynonym(e)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer mx-auto">
            <button
              className="btn btn-primary mr-5"
              onClick={() => handleUpdate(lineData)}
            >
              Update
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalInsert = ({
  handleClose,
  handleInsert,
  show,
  lineData,
  modalInsertSynonym,
  setModalInsertSynonym,
}) => {
  const showHiddenClassName = show
    ? "modal display-block text-center"
    : "modal display-none";

  return (
    <div
      className={showHiddenClassName}
      style={{ background: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Insert Synonym</h5>
            <button className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="username">Synonym</label>
                <input
                  type="text"
                  className="form-control"
                  value={modalInsertSynonym}
                  onChange={(e) => setModalInsertSynonym(e)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer mx-auto">
            <button
              className="btn btn-primary mr-5"
              onClick={() => handleInsert(lineData)}
            >
              Insert
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy_taxid;
