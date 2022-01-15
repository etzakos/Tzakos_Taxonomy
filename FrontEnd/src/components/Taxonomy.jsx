import { Component } from "react";
import { Link } from "react-router-dom";
import httpService from "../services/httpService";
import SearchBox from "./SearchBox";

class Taxonomy extends Component {
  state = {
    myData: [],
    leftSearchBox: "",
    rightSearchBox: "",
    dropDownActiveText: "Mutliple Search",
  };

  async componentDidMount() {
    const { data } = await httpService.get("http://localhost:3001");
    console.log(data);
    this.setState({ myData: data });
  }

  handleSearch1 = (value) => {
    this.setState({ leftSearchBox: value });
  };

  handleSearch2 = (value) => {
    this.setState({ rightSearchBox: value });
  };

  render() {
    const { searchQuery, myData } = this.state;

    return (
      <div class="row">
        <div class="col-lg-4 col-sm-4">
          <SearchBox
            style={{ border: "1px solid black" }}
            value={searchQuery}
            onChange={this.handleSearch1}
          />
        </div>
        <div class="col-lg-4 col-sm-4" align="center">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ margin: "16px" }}
            >
              {this.state.dropDownActiveText}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {this.state.dropDownActiveText === "Mutliple Search" ? (
                ""
              ) : (
                <li>
                  <a
                    class="dropdown-item"
                    onClick={() =>
                      this.setState({ dropDownActiveText: "Mutliple Search" })
                    }
                  >
                    No Multiple Search
                  </a>
                </li>
              )}
              <li>
                <a
                  class="dropdown-item"
                  onClick={() => this.setState({ dropDownActiveText: "AND" })}
                >
                  AND
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  onClick={() => this.setState({ dropDownActiveText: "OR" })}
                >
                  OR
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-sm-4">
          {this.state.dropDownActiveText === "Mutliple Search" ? (
            ""
          ) : (
            <SearchBox
              style={{ border: "1px solid black" }}
              value={searchQuery}
              onChange={this.handleSearch2}
            />
          )}
        </div>
        <div class="col-lg-1 col-sm-1"></div>
        <div class="col-lg-10 col-sm-10">
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
        <div class="col-lg-1 col-sm-1"></div>
      </div>
    );
  }
}

export default Taxonomy;
