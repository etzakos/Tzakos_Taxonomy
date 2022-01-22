import React, { Component } from "react";
import Table from "./common/Table";
import httpService from "../services/httpService";

class Filter extends Component {
  state = {
    tableData: [],
    availableTerms: [{ "Tax ID": "tax_id" }, { "Tax Name": "name_txt" }],
    filterItems: [{ tax_id: "" }],
  };

  updateSearchKey = (event, item) => {
    const { filterItems } = this.state;
    const selectedValue = event.target.value;

    const copyOfFilterItems = filterItems;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);

    copyOfFilterItems[indexOfItemFound] = { [selectedValue]: "" };

    this.setState({ filterItems: copyOfFilterItems });
  };

  addSearchItem = () => {
    const { filterItems } = this.state;
    const copyOfFilterItems = filterItems;

    copyOfFilterItems.push({ tax_id: "" });

    this.setState({ filterItems: copyOfFilterItems });
  };

  removeSearchItem = (item) => {
    const { filterItems } = this.state;
    const copyOfItems = filterItems;
    const indexOfItemFound = copyOfItems.findIndex((i) => i === item);
    copyOfItems.splice(indexOfItemFound, 1);

    this.setState({ filterItems: copyOfItems });
  };

  getCurrentValue = (item) => {
    const { filterItems } = this.state;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);
    const currentKeyTerm = Object.keys(filterItems[indexOfItemFound])[0];
    return this.state.filterItems[indexOfItemFound][currentKeyTerm];
  };

  updateCurrentValue = (e, item) => {
    const { filterItems } = this.state;
    const copyOfFilterItems = filterItems;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);

    const currentKeyTerm = Object.keys(copyOfFilterItems[indexOfItemFound]);
    copyOfFilterItems[indexOfItemFound] = { [currentKeyTerm]: e.target.value };

    this.setState({ filterItems: copyOfFilterItems });
  };

  SearchAll = async () => {
    const { data } = await httpService.get("http://localhost:3001/");
    this.setState({ tableData: data });
  };

  Search = async () => {
    const { data } = await httpService.post(
      "http://localhost:3001/filter_data",
      this.state.filterItems
    );
    console.log(data);
    this.setState({ tableData: data });
  };

  render() {
    const { availableTerms, filterItems, tableData } = this.state;

    return (
      <div>
        <br />
        <br />
        {filterItems.map((item, i) => {
          return (
            <div key={i}>
              <select
                name="cars"
                id="cars"
                onChange={(e) => this.updateSearchKey(e, item)}
              >
                {availableTerms.map((term, j) => {
                  return (
                    <option key={j} value={term[Object.keys(term)[0]]}>
                      {Object.keys(term)[0]}
                    </option>
                  );
                })}
              </select>
              <input
                type="text"
                value={this.getCurrentValue(item)}
                onChange={(e) => this.updateCurrentValue(e, item)}
              ></input>
              {(() => {
                if (i === 0) {
                  return (
                    <button onClick={() => this.addSearchItem()}>+</button>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <button onClick={() => this.removeSearchItem(item)}>
                        -
                      </button>
                      <button onClick={() => this.addSearchItem()}>+</button>
                    </React.Fragment>
                  );
                }
              })()}
            </div>
          );
        })}
        <br />
        <br />
        <button onClick={() => this.SearchAll()}>Get All</button>
        <button onClick={() => this.Search()}>Search</button>
        <br />
        <br />
        <Table tableData={tableData} />
      </div>
    );
  }
}

export default Filter;
