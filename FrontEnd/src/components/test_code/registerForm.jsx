import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "ap.kapetanios30@wind.gr",
      password: "a12345",
      name: "Tolis Sketos",
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
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
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
