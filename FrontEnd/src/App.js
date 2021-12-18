import { reduceRight } from "lodash";
import { Component } from "react";
import "./App.css";
import Taxonomy from "./components/Taxonomy";
import Taxonomy_parent from "./components/Taxonomy_parent";
import Taxonomy_taxid from "./components/Taxonomy_taxid";
import httpService from "./services/httpService";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/Not_found";

class App extends Component {
  // <div class="row">
  //   <div class="col-lg-4 col-sm-6" ></div>
  //   <div class="col-lg-4 col-sm-6"></div>
  //   <div class="col-lg-4 col-sm-12"></div>
  render() {
    return (
      <div>
        <main className="container">
          <Switch>
            <Route path="/taxonomy_parent/:id" component={Taxonomy_parent} />
            <Route path="/taxonomy" component={Taxonomy} />
            <Route path="/taxonomy_taxid/:id" component={Taxonomy_taxid} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/taxonomy" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
