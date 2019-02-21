import React from "react";

import UploadFile from "../uploadFile";
import EditSiteText from "../editSiteText";
import Error404 from "../Error404";

const Dashboard = props => {
  if (props.verifyUser(props.user))
    return (
      <section className="dashboard">
        <h1 className="dashboard_title">Dashboard</h1>
        <UploadFile />
        <EditSiteText />
      </section>
    );
  else return <Error404 />;
};

export default Dashboard;
