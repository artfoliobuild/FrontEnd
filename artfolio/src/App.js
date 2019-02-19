import React from "react";
import { Route, withRouter } from "react-router-dom";

import axios from "axios";
import JWT from "jsonwebtoken";

import Dashboard from "./components/dashboard";
import PhotoGrid from "./components/photoGrid";
import Modal from "./components/modal";
import MobileModal from "./components/mobileModal";
import Header from "./components/header";
import Login from "./components/login";
import SignUp from "./components/signup";
import AddPhoto from "./components/addPhoto";
import ComposePost from "./components/composePost";

// import * as secrets from "./secrets";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
}

const bio = (
  <>
    <p>🐾TEXAS STATE UNIVERSITY 20' 🐾</p>
    <p>Portraits, Automotive, Advertisements, Design.🤘🏽 DM for inquiries 🔍</p>
  </>
);

const images = importAll(require.context("./images", false));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      artist: "Jose Valenzuela",
      firstName: "Jose",
      lastName: "Valenzuela",
      bio: bio,
      posts: [],
      modalSrc: null,
      device: null,
      ready: false
    };
  }
  componentDidMount() {
    // get all posts
    axios
      .get(process.env.REACT_APP_BACKEND + "/posts")
      // .get(secrets.POSTS)
      .then(res => {
        let user = localStorage.getItem("user");
        this.setState({ posts: res.data, user });
      })
      .catch(err => {
        console.log(err);
      });
    this.checkScreenSize();
    this.setState({ ready: true });
  }
  verifyUser = user => {
    if (!user) {
      user = localStorage.getItem("user");
    }
    let message = null;
    JWT.verify(user, process.env.REACT_APP_SECRET, (err, decoded) => {
      message = decoded;
    });
    return message;
  };
  addUser = user => {
    // add a user
    axios({
      method: "post",
      url: process.env.REACT_APP_BACKEND + "/register",
      data: user
    })
      // .post(secrets.REGISTER, user)
      .then(res => {
        this.setState({ user: res.data });
        localStorage.setItem("user", res.data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  findUser = user => {
    // find a user
    axios
      .post(process.env.REACT_APP_BACKEND + "/login", user)
      // .post(secrets.LOGIN, user)
      .then(res => {
        this.setState({ user: res.data });
        localStorage.setItem("user", res.data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  addPhoto = post => {
    console.log(this.verifyUser());
    this.props.history.push("/new");
  };
  handleClick = src => {
    this.checkScreenSize();
    this.setState({ modalSrc: src, scroll: true });
    if (this.state.device !== "mobile") document.body.style.overflow = "hidden";
  };
  yes;
  checkScreenSize = _ => {
    if (window.innerWidth <= 420) this.setState({ device: "mobile" });
    if (window.innerWidth <= 1024 && window.innerWidth > 420)
      this.setState({ device: "tablet" });
    if (window.innerWidth > 1024) this.setState({ device: "desktop" });
  };
  close = e => {
    e.stopPropagation();
    this.setState({ modalSrc: null, scroll: false });
    if (this.state.device !== "mobile") document.body.style.overflow = "auto";
  };
  render() {
    return (
      <div
        className="App"
        style={{ visibility: this.state.ready ? "visible" : "hidden" }}
      >
        <Route path="/dashboard" component={Dashboard} />
        <Route
          exact
          path="/"
          component={_ => (
            <Header
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              bio={this.state.bio}
              user={this.state.user}
              verifyUser={this.verifyUser}
              ready={this.state.ready}
            />
          )}
        />
        <Route
          path="/login"
          component={_ => <Login findUser={this.findUser} />}
        />
        <Route
          path="/signup"
          component={_ => <SignUp addUser={this.addUser} />}
        />
        <Route
          path="/mobile"
          component={props => {
            return (
              <MobileModal
                close={this.close}
                src={this.state.modalSrc}
                artist={this.state.artist}
              />
            );
          }}
        />
        <Route
          exact
          path="/"
          component={props => {
            return (
              <>
                {this.state.modalSrc ? (
                  this.state.device === "mobile" ? null : (
                    <Modal
                      close={this.close}
                      src={this.state.modalSrc}
                      artist={this.state.artist}
                    />
                  )
                ) : null}
                <PhotoGrid
                  device={this.state.device}
                  checkScreenSize={this.checkScreenSize}
                  history={props.history}
                  handleClick={this.handleClick}
                  images={images}
                  dbImages={this.state.posts}
                />
                <AddPhoto addPhoto={this.addPhoto} />
              </>
            );
          }}
        />
        <Route
          exact
          path="/new"
          component={props => (
            <ComposePost
              history={props.history}
              verifyUser={this.verifyUser}
              user={this.state.user}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
