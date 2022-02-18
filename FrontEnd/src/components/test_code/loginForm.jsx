import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import login from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "ap.kapetanios30@wind.gr", password: "a12345" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("User Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // Call the server
    console.log("Submitted");

    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);

      localStorage.setItem("token", jwt);

      // Redirect to Home page after successful login!
      this.props.history.push("/");
    } catch (ex) {
      console.log(25);
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
