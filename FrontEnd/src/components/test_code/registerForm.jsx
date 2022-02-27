import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("User Name"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    // Call the server
    console.log("Submitted");
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);

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
        <div className="mt-4">
          <h1>Register to Taxonomy</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "User Name")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
