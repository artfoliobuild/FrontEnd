import React from "react";
import { Link } from "react-router-dom";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
  }
  preventDefault = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="form_container">
        <form onSubmit={this.preventDefault} className="signup">
          <h2 className="signup_title">Sign Up</h2>
          <input
            className="signup_input"
            type="text"
            placeholder="Username"
            value={this.state.user}
          />
          <input
            className="signup_input"
            type="password"
            placeholder="Password"
            value={this.state.pass}
          />
          <button
            onSubmit={this.preventDefault}
            onClick={this.preventDefault}
            className="signup_button"
          >
            Sign Up
          </button>
          <button
            onSubmit={this.preventDefault}
            onClick={this.preventDefault}
            className="signup_login"
          >
            <Link to="/login">Log In</Link>
          </button>
        </form>
      </div>
    );
  }
}
