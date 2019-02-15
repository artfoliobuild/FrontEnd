import React from "react";
import { Link } from "react-router-dom";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      user: "",
      pass: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addUser({
      email: this.state.email,
      user: this.state.user,
      pass: this.state.pass
    });
  };
  logIn = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="form_container">
        <form onSubmit={this.handleSubmit} className="signup">
          <h2 className="signup_title">Sign Up</h2>
          <input
            className="signup_input"
            type="email"
            data-name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            className="signup_input"
            type="text"
            data-name="user"
            placeholder="Username"
            value={this.state.user}
            onChange={this.handleChange}
            required
          />
          <input
            className="signup_input"
            type="password"
            data-name="pass"
            placeholder="Password"
            value={this.state.pass}
            onChange={this.handleChange}
            required
          />
          <button
            onSubmit={this.handleSubmit}
            onClick={this.handleSubmit}
            className="signup_button"
          >
            Sign Up
          </button>
          <button
            onSubmit={this.logIn}
            onClick={this.logIn}
            className="signup_login"
          >
            <Link to="/login">Log In</Link>
          </button>
        </form>
      </div>
    );
  }
}
