import { Component } from "react";
import "./App.css";
import Taxonomy from "./components/Taxonomy";
import Taxonomy_parent from "./components/Taxonomy_parent";
import Taxonomy_taxid from "./components/Taxonomy_taxid";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/Not_found";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Filter from "./components/Filter";

class App extends Component {
  render() {
    console.warn = () => {};
    return (
      <div>
        <main className="container">
          <Header />
          <Switch>
            <Route path="/taxonomy_parent/:id" component={Taxonomy_parent} />
            <Route path="/taxonomy" component={Taxonomy} />
            <Route path="/search" component={Filter} />
            <Route path="/taxonomy_taxid/:id" component={Taxonomy_taxid} />
            <Route path="/homepage" component={Homepage} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/homepage" />
            <Redirect to="/not-found" />
          </Switch>
          {/* <Footer /> */}
        </main>
      </div>
    );
  }
}

export default App;
