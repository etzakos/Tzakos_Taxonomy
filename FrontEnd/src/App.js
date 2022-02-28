import { Component } from "react";

import Taxonomy from "./components/Taxonomy";
import Taxonomy_parent from "./components/Taxonomy_parent";
import TaxonomyTaxid from "./components/Taxonomy_taxid";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/Not_found";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Filter from "./components/Filter";
import RegisterForm from "./components/test_code/registerForm";
import LoginForm from "./components/test_code/loginForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    console.warn = () => {};
    return (
      <div>
        <main className="mx-auto w-70">
          <Header user={this.state.user} />
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/taxonomy_parent/:id" component={Taxonomy_parent} />
            <Route path="/taxonomy" component={Taxonomy} />
            <Route path="/search" component={Filter} />
            <Route
              path="/taxonomy_taxid/:id"
              render={(props) => (
                <TaxonomyTaxid {...props} user={this.state.user} />
              )}
            />
            <Route path="/homepage" component={Homepage} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/homepage" />
            <Redirect to="/not-found" />
          </Switch>
          <Footer />
        </main>
      </div>
    );
  }
}

export default App;
