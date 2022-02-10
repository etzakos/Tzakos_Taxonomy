import React from "react";
import Form from "./common/form_components/form";

class UpdateForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [
      { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    ],
    errors: {},
  };

  doSubmit = async () => {
    try {
      //   await saveMovie(this.state.data);
      //   this.props.history.push("/movies");
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        console.error(ex.response.data);
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <h4>Tax_ID: </h4>
          {this.renderInput("rank_id", "Rank")}
          {this.renderSelect("rank_id", "Rank", this.state.genres)}
          {/* {this.renderInput("embl_code", "Embl_Code")}
          {this.renderInput("name_txt", "Name/Synonyms")}
          {this.renderInput("genetic_code_id", "Genetic Name")}
          {this.renderInput("lineage", "Lineage")} */}

          {/* {this.renderSelect("genreId", "Genre", this.state.genres)} */}
          {/* {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")} */}
        </form>
      </div>
    );
  }
}

export default UpdateForm;
