import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import UploadFile from "../uploadFile";
import EditSiteText from "../editSiteText";
import Error404 from "../Error404";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.verifyUser(this.props.user))
      return (
        <section className="dashboard">
          <h1 className="dashboard_title">Dashboard</h1>
          <UploadFile />
          <EditSiteText />
        </section>
      );
    else return <Error404 />;
  }
}
