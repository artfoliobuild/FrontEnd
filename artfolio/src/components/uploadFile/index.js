import React from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      all: null
    };
  }
  componentDidMount() {
    axios
      .get(BACKEND + "/posts")
      // .get(secrets.POSTS)
      .then(res => {
        this.setState({ all: res.data });
      })
      .catch(err => console.log(err));
  }
  fileSelectedHandler = e => {
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      _ => {
        this.setState({ file: reader.result });
      },
      false
    );

    if (e) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  fileUploadHandler = _ => {
    axios
      .post(BACKEND + "/posts", {
        description: "shrimpcx",
        likes: 0,
        image: this.state.file,
        user_id: 3
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="dashboard_uploadContainer">
        <h3 className="dashboard_uploadTitle">Change Profile Picture</h3>
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
        <img src={this.state.file} />
      </div>
    );
  }
}
