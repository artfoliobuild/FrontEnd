import React from "react";
import axios from "axios";

import EditSiteTextArea from "../editSiteTextArea";

export default class EditSiteText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      active: null
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
    this.setState({ active: e.target.dataset.name });
  };
  render() {
    return (
      <div className="editSiteText">
        <h3 className="editSiteText_title">Edit Site Text</h3>
        <div className="editSiteText_selections">
          <div
            className="editSiteText_selections_option"
            data-name="bio"
            onClick={this.handleSelectOption}
            ref={option => (this.option3 = option)}
          >
            Bio
          </div>
          <div
            className="editSiteText_selections_option"
            data-name="bgColor"
            onClick={this.handleSelectOption}
            ref={option => (this.option4 = option)}
          >
            Background Color
          </div>
          <div
            className="editSiteText_selections_option"
            data-name="hlColor"
            onClick={this.handleSelectOption}
            ref={option => (this.option5 = option)}
          >
            Highlight Color
          </div>
        </div>
        <div>
          <EditSiteTextArea type={this.state.active} />
        </div>
      </div>
    );
  }
}
