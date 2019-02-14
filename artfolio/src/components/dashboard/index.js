import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import UploadFile from "../uploadFile";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dashboard">
        <h1 className="dashboard_title">Dashboard</h1>
        <UploadFile />
      </div>
    );
  }
}
