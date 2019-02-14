import React from "react";
import axios from "axios";

export default class EditSiteText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }
  componentDidMount() {
    const options = [
      this.option1,
      this.option2,
      this.option3,
      this.option4,
      this.option5
    ];
    this.setState({
      options
    });
  }
  handleSelectOption = e => {
    this.state.options.forEach(e => {
      e.classList.remove("editSiteText_selections_option-active");
    });
    e.target.classList.add("editSiteText_selections_option-active");
  };
  render() {
    return (
      <div className="editSiteText">
        <h2 className="editSiteText_title">Edit Site Text</h2>
        <div className="editSiteText_selections">
          <div
            className="editSiteText_selections_option"
            onClick={this.handleSelectOption}
            ref={option => (this.option1 = option)}
          >
            Site Name
          </div>
          <div
            className="editSiteText_selections_option"
            onClick={this.handleSelectOption}
            ref={option => (this.option2 = option)}
          >
            Your Name
          </div>
          <div
            className="editSiteText_selections_option"
            onClick={this.handleSelectOption}
            ref={option => (this.option3 = option)}
          >
            Bio
          </div>
          <div
            className="editSiteText_selections_option"
            onClick={this.handleSelectOption}
            ref={option => (this.option4 = option)}
          >
            Background Color
          </div>
          <div
            className="editSiteText_selections_option"
            onClick={this.handleSelectOption}
            ref={option => (this.option5 = option)}
          >
            Highlight Color
          </div>
        </div>
      </div>
    );
  }
}
