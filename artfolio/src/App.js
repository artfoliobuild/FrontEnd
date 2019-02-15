import React from "react";
import { Route } from "react-router-dom";

import axios from "axios";

import Dashboard from "./components/dashboard";
import PhotoGrid from "./components/photoGrid";
import Modal from "./components/modal";
import MobileModal from "./components/mobileModal";
import Header from "./components/header";
import Login from "./components/login";
import SignUp from "./components/signup";

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
      posts: [],
      user: null,
      artist: "Jose Valenzuela",
      modalSrc: null,
      device: null,
      ready: false,
      bio: bio,
      firstName: "Jose",
      lastName: "Valenzuela"
    };
  }
  componentDidMount() {
    // get all posts
    axios
      .get(secrets.TEMP_POSTS)
      .then(res => {
        console.log(res.data);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    this.checkScreenSize();
    this.setState({ ready: true });
  }
  addUser = user => {
    // add a user
    // axios
    //   .post(secrets.TEMP_USERS, {})
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ user: res.data });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    console.log(user);
  };
  handleClick = src => {
    this.checkScreenSize();
    this.setState({ modalSrc: src, scroll: true });
    if (this.state.device !== "mobile") document.body.style.overflow = "hidden";
  };
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
              ready={this.state.ready}
            />
          )}
        />
        <Route path="/login" component={Login} />
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
                />
              </>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
