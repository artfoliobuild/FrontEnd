import React from "react";
import { Link } from "react-router-dom";

const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");

export default function Header(props) {
  return (
    <div
      className="header"
      style={{ visibility: props.ready ? "visible" : "hidden" }}
    >
      <div className="header_login">
        {(props.user &&
          "logged in as, " + props.verifyUser(props.user).username) || (
          <Link to="/login">login</Link>
        )}
      </div>
      <div className="header_profile">
        <img className="header_profile_img" src={image} alt="profile" />
      </div>
      <div className="header_title">
        <h2 className="header_title_h2">
          {props.firstName} <span className="left-slash">/</span>
          <span className="right-slash">/</span> {props.lastName}
        </h2>
      </div>
      <div className="header_bio">{props.bio}</div>
    </div>
  );
}
