import React from "react";
import { Link } from "react-router-dom";

const Table = ({ tableDataInput }) => {
  const tableData = tableDataInput || [];
  return (
    <React.Fragment>
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
            {tableData.map((row, i) => (
              <tr key={row.tax_id}>
                <td>
                  {i + (this.state.currentPage - 1) * this.state.pageSize + 1}
                </td>
                <td>
                  <Link to={`/taxonomy_taxid/${row.tax_id}`}>{row.tax_id}</Link>
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
    </React.Fragment>
  );
};

export default Table;
