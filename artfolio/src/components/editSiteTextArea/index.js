import React from "react";
import axios from "axios";

export default class EditSiteTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (!this.props.type) {
      return null;
    } else {
      return (
        <form className="editSiteForm">
          {this.props.type === "bio" ? (
            <textarea
              className="editSiteForm_textarea"
              name=""
              id=""
              cols="30"
              rows="10"
              required
            />
          ) : (
            <input className="editSiteForm_input" type="text" required />
          )}
          <button className="editSiteForm_button">Submit</button>
        </form>
      );
    }
  }
}
