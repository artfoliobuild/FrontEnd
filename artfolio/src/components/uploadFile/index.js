import React from "react";
import axios from "axios";

import * as secrets from "../../secrets";

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
      .get(secrets.POSTS)
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
    // this.setState({ file: e.target.files[0] });
  };
  fileUploadHandler = _ => {
    axios
      .post(secrets.POSTS, {
        id: this.state.all.length + 1,
        description: "shrimpcx",
        likes: 0,
        image: this.state.file,
        user_id: 0
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    // axios
    //   .put(`http://localhost:9000/users/${this.props.userId}`, {
    //     description: "shrimpcx",
    //     likes: 0,
    //     image: this.state.file,
    //     user_id: 0
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err));
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
        {/* {this.state.all
          ? this.state.all.map(img => {
              return <img src={img.image} />;
            })
          : null} */}
      </div>
    );
  }
}
