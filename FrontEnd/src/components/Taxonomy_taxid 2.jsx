import { Component } from "react";
import httpService from "../services/httpService";
import { Link } from "react-router-dom";

class Taxonomy_taxid extends Component {
  state = {
    myData: [],
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  async componentDidMount() {
    let id = this.props.match.params.id;
    const { data } = await httpService.get(
      `http://localhost:3001/taxonomy_taxid/${id}`
    );
    console.log(data);
    this.setState({ myData: data });
  }

  render() {
    return (
      <div class="row">
        <div class="col-lg-6 col-sm-6">
          {/* <button onClick={() => this.getInfo()}>Click me</button> */}
          <h1>React Modal</h1>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <p>Modal</p>
          </Modal>
          <button type="button" onClick={this.showModal}>
            Open
          </button>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tax_ID</th>
                <th scope="col">Rank</th>
                <th scope="col">Embl_Code</th>
                <th scope="col">TAX_Name</th>
                <th scope="col">Genetic_code_id</th>
                <th scope="col">mitochondrial_genetic_code_id</th>
                <th scope="col">Parent Tax_ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.myData.map((row) => (
                <tr key={row.tax_id}>
                  <td>{row.tax_id}</td>
                  <td>{row.rank}</td>
                  <td>{row.embl_code}</td>
                  <td>{row.name_txt}</td>
                  <td>
                    {" "}
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                      <p>
                        <td>{row.cde}</td>
                      </p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Taxonomy_taxid;
