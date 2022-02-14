import React, { Component } from "react";
import Table from "./common/Table";
import equal from "fast-deep-equal";
import httpService from "../services/httpService";
import { Spin } from "antd";

class Filter extends Component {
  constructor() {
    super();

    this.state = {
      isFetching: false,
      tableData: [],
      availableTerms: [
        { "Tax ID": "tax_id" },
        { "Scientific Name": "lower_name_txt" },
      ],
      filterItems: [{ field: ["tax_id", ""] }],

      searched: false,

      searchButtonDisabled: true,
    };
  }

  componentDidMount() {
    const tableData = localStorage.getItem("filterPage_tableData");
    if (tableData && tableData.length > 0) {
      this.setState({ tableData: JSON.parse(tableData) }, () => {
        this.checkIfSearchButtonShouldBeDisabled();
      });
    }

    const filterTerms = localStorage.getItem("filterTerms");
    if (filterTerms && filterTerms.length > 0) {
      this.setState({ filterItems: JSON.parse(filterTerms) });
    }
  }

  updateLocalStorage = () => {
    localStorage.setItem(
      "filterPage_tableData",
      JSON.stringify(this.state.tableData)
    );

    localStorage.setItem("filterTerms", JSON.stringify(this.state.filterItems));
  };

  componentDidUpdate(prevState) {
    if (
      !equal(this.state.filterItems, prevState.filterItems) ||
      !equal(this.state.tableData, prevState.tableData)
    ) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      // this.setState({ myDateRange: this.props.dateRange });
      // this.checkIfSearchButtonShouldBeDisabled();
      this.updateLocalStorage();
    }
  }

  updateSearchKey = (event, item) => {
    const { filterItems } = this.state;
    const selectedValue = event.target.value;

    const copyOfFilterItems = filterItems;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);

    copyOfFilterItems[indexOfItemFound]["field"][0] = selectedValue;

    console.log("selectedValue", selectedValue);
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

    this.checkIfSearchButtonShouldBeDisabled();
    this.setState({ filterItems: copyOfFilterItems });
  };

  removeSearchItem = (item) => {
    const { filterItems } = this.state;
    const copyOfItems = filterItems;
    const indexOfItemFound = copyOfItems.findIndex((i) => i === item);
    copyOfItems.splice(indexOfItemFound, 1);
    console.log("copyOfItems", copyOfItems);
    this.setState({ filterItems: copyOfItems });
  };

  getCurrentValue = (item) => {
    const { filterItems } = this.state;
    const indexOfItemFound = filterItems.findIndex((i) => i === item);
    console.log(indexOfItemFound);
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
    this.checkIfSearchButtonShouldBeDisabled();
    this.setState({ filterItems: copyOfFilterItems });
  };

  checkIfSearchButtonShouldBeDisabled() {
    let buttonShouldBeDisabled = false;
    for (const element of this.state.filterItems) {
      if (!element["field"][1]) {
        buttonShouldBeDisabled = true;
      }
    }
    this.setState({ searchButtonDisabled: buttonShouldBeDisabled });
  }

  SearchAll = async () => {
    const { data } = await httpService.get("http://localhost:3001/api/");
    this.setState({ tableData: data, searched: true });
  };

  Search = async () => {
    this.setState({ isFetching: true });
    const { data } = await httpService.post(
      "http://localhost:3001/api/filter_data",
      this.state.filterItems
    );
    this.setState({ tableData: data, searched: true });

    setTimeout(() => {
      this.setState({ isFetching: false });
    }, 500);
  };

  myStyle = (i) => {
    if (i === 0) {
      return { marginLeft: "52px" };
    }
  };

  clearAllFiltersAndResults = () => {
    this.setState({
      tableData: [],
      filterItems: [{ field: ["tax_id", ""] }],
      searched: false,
    });
    localStorage.clear();
  };

  render() {
    const { availableTerms, filterItems, tableData } = this.state;
    return (
      <div className="bg-light mx-auto mt-4">
        <div className="p-2 mx-auto text-center">
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
                        value={this.state.filterItems[i]["boolean"]}
                      >
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                        <option value="and not">NOT</option>
                      </select>
                    );
                  }
                })()}
                <select
                  name="field"
                  id="field"
                  style={{ margin: "10px" }}
                  onChange={(e) => this.updateSearchKey(e, item)}
                  value={this.state.filterItems[i]["field"][0]}
                >
                  {availableTerms.map((term, j) => {
                    return (
                      <option
                        key={j}
                        value={term[Object.keys(term)[0]]}
                        defaultValue={
                          Object.keys(term)[0] === filterItems[i].field[0]
                            ? "selected"
                            : ""
                        }
                      >
                        {Object.keys(term)[0]}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  value={this.state.filterItems[i].field[1]}
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
          <div className="mt-4">
            <button
              className="btn btn-secondary mr-3"
              onClick={() => this.SearchAll()}
            >
              Get Sample Data
            </button>
            <button
              onClick={() => this.Search()}
              disabled={this.state.searchButtonDisabled}
              className="btn btn-primary mx-4"
            >
              Search
            </button>
            <button
              onClick={() => this.clearAllFiltersAndResults()}
              className="btn btn-info mx-4"
            >
              Clear
            </button>
          </div>
          <div className="mt-4">
            {this.state.isFetching ? (
              <div className="d-flex align-items-center justify-content-center">
                <Spin
                  // indicator={getIndicatorIcon}
                  size="large"
                ></Spin>
                <span className="p-3 text-center">Please wait...</span>
              </div>
            ) : this.state.searched && this.state.tableData.length === 0 ? (
              <h4>No Data Found</h4>
            ) : (
              <Table tableData={tableData} numberOfResults={tableData.length} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
