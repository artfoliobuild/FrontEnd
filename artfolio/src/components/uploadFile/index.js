import React from "react";
import axios from "axios";

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }
  fileSelectedHandler = e => {
    this.setState({ file: e.target.files[0] });
  };
  fileUploadHandler = _ => {
    const fd = new FormData();
    fd.append("image", this.state.file, this.state.file.name);
    console.log(fd);
  };
  render() {
    return (
      <div className="dashboard_uploadContainer">
        <h2>Change Profile Picture</h2>
        <input
          style={{ display: "none" }}
          onChange={this.fileSelectedHandler}
          type="file"
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <div className="dashboard_uploadButtons">
          <button
            className="dashboard_pickFile"
            style={{ display: "block" }}
            onClick={_ => this.fileInput.click()}
          >
            Pick File
          </button>
          <button
            className="dashboard_uploadFile"
            style={{ display: this.state.file ? "block" : "none" }}
            onClick={this.fileUploadHandler}
          >
            Upload File
          </button>
        </div>
        <span className="dashboard_fileName">
          {this.state.file ? this.state.file.name : null}
        </span>
      </div>
    );
  }
}
