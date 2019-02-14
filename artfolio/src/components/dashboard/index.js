import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Dashboard extends React.Component {
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
      <div className="dashboard">
        <h1 className="dashboard_title">Dashboard</h1>
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
