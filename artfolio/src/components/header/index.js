import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogOut } from "../../images/icons/log-out.svg";

export default function Header(props) {
  return (
    <div
      className="header"
      style={{ visibility: props.ready ? "visible" : "hidden" }}
    >
      <div className="header_login">
        {props.user && props.verifyUser(props.user) ? (
          <div>
            Hello, {props.verifyUser(props.user).username}
            <div className="header_login_button" onClick={props.signOut}>
              <LogOut className="header_login_button_icon" />
            </div>
          </div>
        ) : (
          <Link className="header_login" to="/login">
            log in
          </Link>
        )}
      </div>
      <div className="header_profile">
        <img className="header_profile_img" src={props.avatar} alt="profile" />
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
