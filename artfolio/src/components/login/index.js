import React from "react";
import { Link } from "react-router-dom";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.findUser({
      username: this.state.user,
      password: this.state.pass
    });
  };
  signUp = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="form_container">
        <form onSubmit={this.handleSubmit} className="login">
          <h2 className="login_title">Log In</h2>
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
            onSubmit={this.signUp}
            onClick={this.signUp}
            className="login_signup"
          >
            <Link to="/signup">Sign Up</Link>
          </button>
        </form>
      </div>
    );
  }
}
