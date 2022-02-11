import React from "react";
import Form from "./common/form_components/form";

class MyForm extends Form {
  state = {
    data: [],
    errors: [],
  };

  schema = {};

  render() {
    return (
      <div className="container">
        <div className="w-50">
          {this.renderInput("first_name", "First Name")}
        </div>
      </div>
    );
  }
}

export default MyForm;
