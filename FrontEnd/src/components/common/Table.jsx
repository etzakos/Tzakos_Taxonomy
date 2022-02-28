import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
class Table extends Component {
  constructor() {
    super();
    this.state = {
      myData: [],
      currentPage: 1,
      pageSize: 10,
      numberOfResults: "",
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = (tableData) => {
    const { pageSize, currentPage } = this.state;

    const pagedItems = paginate(tableData, currentPage, pageSize);
    return pagedItems;
  };

  render() {
    // const pagedData = this.getPagedData();
    const tableDataAll = this.props.tableData;
    const tableDataPage = this.getPagedData(tableDataAll);

    if (!this.props.numberOfResults) {
      return null;
    }
    return (
      <React.Fragment>
        <h4>Results found: {this.props.numberOfResults}</h4>
        <div className="col-lg-1 col-sm-1"></div>
        <div className="col-lg-12 col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item2</th>
                <th scope="col">Tax_ID</th>
                <th scope="col">Scientific Name</th>
                <th scope="col">Rank</th>
                <th scope="col">Parent Tax_ID</th>
              </tr>
            </thead>

            <tbody>
              {tableDataPage.map((row, i) => (
                <tr key={i}>
                  <td>
                    {i + (this.state.currentPage - 1) * this.state.pageSize + 1}
                  </td>
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
        {tableDataAll.length > 10 ? (
          <div>
            <div className="col-lg-8 col-sm-8"></div>
            <div className="col-lg-4 col-sm-4">
              <Pagination
                itemsCount={tableDataAll.length}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default Table;
