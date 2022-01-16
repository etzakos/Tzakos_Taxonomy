import { Component } from "react";
import { Link } from "react-router-dom";
import httpService from "../services/httpService";
import SearchBox from "./SearchBox";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";

class Taxonomy extends Component {
  state = {
    myData: [],
    leftSearchBox: "",
    rightSearchBox: "",
    dropDownActiveText: "Mutliple Search",
    currentPage: 1,
    pageSize: 10,
    itemNum: 0,
  };

  async componentDidMount() {
    const { data } = await httpService.get("http://localhost:3001");
    this.setState({ myData: data });
  }

  handleSearch1 = (value) => {
    this.setState({ leftSearchBox: value });
  };

  handleSearch2 = (value) => {
    this.setState({ rightSearchBox: value });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, myData } = this.state;

    const pagedItems = paginate(myData, currentPage, pageSize);
    console.log(pagedItems);
    return pagedItems;
  };

  render() {
    const { searchQuery } = this.state;
    const pagedData = this.getPagedData();

    return (
      <div className="row">
        <div className="col-lg-4 col-sm-4">
          <SearchBox
            style={{ border: "1px solid black" }}
            value={searchQuery}
            onChange={this.handleSearch1}
          />
        </div>
        <div className="col-lg-4 col-sm-4" align="center">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ margin: "16px" }}
            >
              {this.state.dropDownActiveText}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {this.state.dropDownActiveText === "Mutliple Search" ? (
                ""
              ) : (
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      this.setState({ dropDownActiveText: "Mutliple Search" })
                    }
                  >
                    No Multiple Search
                  </button>
                </li>
              )}
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ dropDownActiveText: "AND" })}
                >
                  AND
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ dropDownActiveText: "OR" })}
                >
                  OR
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-sm-4">
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
        <div className="col-lg-1 col-sm-1"></div>
        <div className="col-lg-10 col-sm-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Tax_ID</th>
                <th scope="col">Rank</th>
                <th scope="col">Parent Tax_ID</th>
              </tr>
            </thead>

            <tbody>
              {pagedData.map((row, i) => (
                <tr key={row.tax_id}>
                  <td>
                    {i + (this.state.currentPage - 1) * this.state.pageSize + 1}
                  </td>
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
        <div className="col-lg-8 col-sm-8"></div>
        <div className="col-lg-4 col-sm-4">
          <Pagination
            itemsCount={this.state.myData.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Taxonomy;
