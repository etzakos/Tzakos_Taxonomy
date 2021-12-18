import { Component } from "react";
import httpService from "../services/httpService";
import { Link } from "react-router-dom";
import axios from "axios";
class Taxonomy extends Component {
  state = {
    myData: [],
  };

  async componentDidMount() {
    const { data } = await httpService.get("http://localhost:3001");
    console.log(data);
    this.setState({ myData: data });
  }

  getInfo = async () => {
    const { data } = await httpService.get("http://localhost:3001");
    console.log(data);
    this.setState({ myData: data });
  };

  // <div class="row">
  //   <div class="col-lg-4 col-sm-6" ></div>
  //   <div class="col-lg-4 col-sm-6"></div>
  //   <div class="col-lg-4 col-sm-12"></div>
  render() {
    return (
      <div class="row">
        <div class="col-lg-6 col-sm-6">
          {/* <button onClick={() => this.getInfo()}>Click me</button> */}

          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tax_ID</th>
                <th scope="col">Rank</th>
                <th scope="col">Parent Tax_ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.myData.map((row) => (
                <tr key={row.tax_id}>
                  <td>
                    <Link to={`/taxonomy_taxid/${row.tax_id}`}>
                      {row.tax_id}
                    </Link>
                  </td>
                  <td>{row.rank}</td>
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

export default Taxonomy;
