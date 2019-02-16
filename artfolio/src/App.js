import React from "react";
import { Route, withRouter } from "react-router-dom";

import axios from "axios";

import Dashboard from "./components/dashboard";
import PhotoGrid from "./components/photoGrid";
import Modal from "./components/modal";
import MobileModal from "./components/mobileModal";
import Header from "./components/header";
import Login from "./components/login";
import SignUp from "./components/signup";
import AddPhoto from "./components/addPhoto";

import * as secrets from "./secrets";

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
      .get(secrets.POSTS)
      .then(res => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.setState({ posts: res.data, user });
      })
      .catch(err => {
        console.log(err);
      });
    this.checkScreenSize();

    this.setState({ ready: true });
  }
  addUser = user => {
    // add a user
    axios
      .post(secrets.REGISTER, user)
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  findUser = user => {
    // find a user
    axios
      .post(secrets.LOGIN, user)
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  addPost = post => {
    axios
      .post(secrets.POSTS, post)
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log(err);
      });
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
                <AddPhoto addPost={this.addPost} />
              </>
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
