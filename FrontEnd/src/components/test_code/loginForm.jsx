import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("User Name"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    // Call the server
    console.log("Submitted");

    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      // Redirect to Home page after successful login!
      // this.props.history.push("/");

      // Full web page reload is required
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="mt-5">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "User Name")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
