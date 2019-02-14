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
      <div className="">
        <input
          style={{ display: "none" }}
          onChange={this.fileSelectedHandler}
          type="file"
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <button onClick={_ => this.fileInput.click()}>Pick File</button>
        <button
          style={{ display: this.state.file ? "inline" : "none" }}
          onClick={this.fileUploadHandler}
        >
          Upload File
        </button>
        <span>{this.state.file ? this.state.file.name : null}</span>
      </div>
    );
  }
}
