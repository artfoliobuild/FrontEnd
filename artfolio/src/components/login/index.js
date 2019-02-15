import React from "react";
import { Link } from "react-router-dom";

export default class LogIn extends React.Component {
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
  signIn = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="form_container">
        <form onSubmit={this.handleSubmit} className="login">
          <h2 className="login_title">Log In</h2>
          <input
            className="login_input"
            type="email"
            data-name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            className="login_input"
            type="text"
            data-name="user"
            placeholder="Username"
            value={this.state.user}
            onChange={this.handleChange}
            required
          />
          <input
            className="login_input"
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
            className="login_button"
          >
            Log In
          </button>
          <button
            onSubmit={this.signIn}
            onClick={this.signIn}
            className="login_signup"
          >
            <Link to="/signup">Sign Up</Link>
          </button>
        </form>
      </div>
    );
  }
}
