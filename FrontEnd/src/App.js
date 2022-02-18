import { Component } from "react";
import jwtDecode from "jwt-decode";
import Taxonomy from "./components/Taxonomy";
import Taxonomy_parent from "./components/Taxonomy_parent";
import Taxonomy_taxid from "./components/Taxonomy_taxid";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/Not_found";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Filter from "./components/Filter";
import RegisterForm from "./components/test_code/registerForm";
import LoginForm from "./components/test_code/loginForm";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {
      // Ignore this error because it is not an application error
      // This catch handles the scenario where the JWT token does not exist in localStorage (user not logged in)
    }
  }

  render() {
    console.warn = () => {};
    return (
      <div>
        <main className="mx-auto w-70">
          <Header user={this.state.user} />
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/taxonomy_parent/:id" component={Taxonomy_parent} />
            <Route path="/taxonomy" component={Taxonomy} />
            <Route path="/search" component={Filter} />
            <Route path="/taxonomy_taxid/:id" component={Taxonomy_taxid} />
            <Route path="/homepage" component={Homepage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/homepage" />
            <Redirect to="/not-found" />
          </Switch>
          <Footer className="fixed-bottom mx-auto" />
        </main>
      </div>
    );
  }
}

export default App;
