import React, { Component } from "react";
import Table from "./common/Table";
import httpService from "../services/httpService";

class Filter extends Component {
  state = {
    tableData: [],
    availableTerms: [{ "Tax ID": "tax_id" }, { "Scientific Name": "name_txt" }],
    filterItems: [{ field: ["tax_id", ""] }],
  };

  updateSearchKey = (event, item) => {
    const { filterItems } = this.state;
    const selectedValue = event.target.value;

    const copyOfFilterItems = filterItems;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);

    copyOfFilterItems[indexOfItemFound]["field"][0] = selectedValue;

    this.setState({ filterItems: copyOfFilterItems });
  };

  updateBolleanKey = (event, item) => {
    const { filterItems } = this.state;
    const selectedValue = event.target.value;

    const copyOfFilterItems = filterItems;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);

    copyOfFilterItems[indexOfItemFound]["boolean"] = selectedValue;

    this.setState({ filterItems: copyOfFilterItems });
  };

  addSearchItem = () => {
    const { filterItems } = this.state;
    const copyOfFilterItems = filterItems;

    copyOfFilterItems.push({ boolean: "and", field: ["tax_id", ""] });

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
    // filterItems: [{ field: ["tax_id", ""] }, { boolean: "or" field: ["tax_id", ""] }],
    const currentKeyTerm = Object.keys(
      filterItems[indexOfItemFound]["field"]
    )[1];
    return this.state.filterItems[indexOfItemFound][currentKeyTerm];
  };

  updateCurrentValue = (e, item) => {
    const { filterItems } = this.state;
    const copyOfFilterItems = filterItems;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);

    // const currentKeyTerm = Object.keys(copyOfFilterItems[indexOfItemFound]);
    copyOfFilterItems[indexOfItemFound]["field"][1] = e.target.value;

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

  myStyle = (i) => {
    if (i === 0) {
      return { marginLeft: "52px" };
    }
  };

  render() {
    const { availableTerms, filterItems, tableData } = this.state;

    return (
      <div>
        <br />
        <br />
        {filterItems.map((item, i) => {
          return (
            <div key={i} style={this.myStyle(i)}>
              {(() => {
                if (i > 0) {
                  return (
                    <select
                      name="boolean"
                      id="boolean"
                      onChange={(e) => this.updateBolleanKey(e, item)}
                    >
                      <option value="and">AND</option>
                      <option value="or">OR</option>
                    </select>
                  );
                }
              })()}
              <select
                name="field"
                id="field"
                style={{ margin: "10px" }}
                onChange={(e) => this.updateSearchKey(e, item)}
              >
                {/* availableTerms: , */}
                {availableTerms.map((term, j) => {
                  // console.log("129", term[Object.keys(term)[0]]);
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
                    <button
                      style={{ margin: "10px" }}
                      onClick={() => this.addSearchItem()}
                    >
                      +
                    </button>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <button
                        style={{ margin: "10px" }}
                        onClick={() => this.removeSearchItem(item)}
                      >
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
        <div style={{ marginLeft: "42px" }}>
          <button style={{ margin: "10px" }} onClick={() => this.SearchAll()}>
            Get Sample Data
          </button>
          <button onClick={() => this.Search()}>Search</button>
        </div>
        <br />
        <br />
        <Table tableData={tableData} />
      </div>
    );
  }
}

export default Filter;
