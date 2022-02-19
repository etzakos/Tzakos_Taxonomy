import { Component } from "react";
import httpService from "../services/httpService";
import { Link } from "react-router-dom";
import { apiUrl } from "../config.json";

class Taxonomy_parent extends Component {
  state = {
    myData: [],
  };

  async componentDidMount() {
    let id = this.props.match.params.id;
    const { data } = await httpService.get(`${apiUrl}/taxonomy_parent/${id}`);
    this.setState({ myData: data });
  }

  render() {
    return (
      <div style={{ height: "100vw" }} className="bg-light mx-auto mt-4">
        <div className="p-2 mx-auto text-center">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tax_ID</th>
                <th scope="col">Scientific Name</th>
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
                  <td>{row.name_txt}</td>
                  <td>{row.rank_id}</td>
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

export default Taxonomy_parent;
