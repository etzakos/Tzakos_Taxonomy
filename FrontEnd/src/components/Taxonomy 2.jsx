import { Component } from "react";
import { Link } from "react-router-dom";
import httpService from "../services/httpService";
import SearchBox from "./SearchBox";

class Taxonomy extends Component {
  state = {
    myData: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await httpService.get("http://localhost:3001");
    console.log(data);
    this.setState({ myData: data });
  }

  handleSearch = (value) => {
    this.setState({ searchQuery: value });
  };

  render() {
    const { searchQuery, myData } = this.state;

    return (
      <div class="row">
        <div class="col-lg-6 col-sm-6">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tax_ID</th>
                <th scope="col">Rank</th>
                <th scope="col">Parent Tax_ID</th>
              </tr>
            </thead>

            <tbody>
              {myData.map((row) => (
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

export default Taxonomy;
