import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
  }
  render() {
    return (
      <div className="form_container">
        <form className="login">
          <h2 className="login_title">Log In</h2>
          <input
            className="login_input"
            type="text"
            placeholder="Username"
            value={this.state.user}
          />
          <input
            className="login_input"
            type="password"
            placeholder="Password"
            value={this.state.pass}
          />
          <button className="login_button">Log In</button>
          <button className="login_signup">
            <Link to="/signup">Sign Up</Link>
          </button>
        </form>
      </div>
    );
  }
}
