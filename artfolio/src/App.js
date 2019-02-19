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
import Error404 from "./components/Error404";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");
const SECRET = process.env.REACT_APP_SECRET;

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
}

const bio = (
  <>
    <p>🐾TEXAS STATE UNIVERSITY 20&#39; 🐾</p>
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
      post: null,
      device: null,
      loginErr: null,
      ready: false
    };
  }
  componentDidMount() {
    // get all posts
    axios.get(BACKEND + "/posts").then(res => {
      let user = localStorage.getItem("user");
      this.setState({ posts: res.data, user });
    });
    this.checkScreenSize();
    this.setState({ ready: true });
  }
  verifyUser = user => {
    if (!user) {
      user = localStorage.getItem("user");
    }
    let message = null;
    JWT.verify(user, SECRET, (err, decoded) => {
      message = decoded;
    });
    return message;
  };
  addUser = user => {
    // add a user
    axios({
      method: "post",
      url: BACKEND + "/register",
      data: user
    }).then(res => {
      this.setState({ user: res.data });
      localStorage.setItem("user", res.data);
      this.props.history.push("/");
    });
  };
  findUser = user => {
    // find a user
    axios
      .post(BACKEND + "/login", user)
      .then(res => {
        this.setState({ user: res.data });
        localStorage.setItem("user", res.data);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          loginErr:
            "There was an issue logging in. Check username/password or sign up if you haven't"
        });
      });
  };
  addPhoto = _ => {
    this.props.history.push("/new");
  };
  getPosts = postId => {
    axios.get(BACKEND + "/posts/" + postId).then(res => {
      const newPosts = [...this.state.posts, res.data];
      this.setState({ posts: newPosts });
    });
  };
  handleClick = image => {
    this.checkScreenSize();
    this.setState({
      modalSrc: image.image || image,
      scroll: true,
      post: image
    });
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
    this.setState({
      modalSrc: null,
      scroll: false,
      post: null
    });
    if (this.state.device !== "mobile") document.body.style.overflow = "auto";
  };
  closeRefresh = e => {
    this.close();
    axios.get(BACKEND + "/posts").then(res => {
      let user = localStorage.getItem("user");
      this.setState({ posts: res.data, user });
    });
    this.checkScreenSize();
    this.setState({ ready: true });
  };
  signOut = _ => {
    localStorage.clear();
    this.setState({ user: null });
  };
  render() {
    return (
      <div
        className="App"
        style={{ visibility: this.state.ready ? "visible" : "hidden" }}
      >
        <Route
          exact
          path="/dashboard"
          component={_ => (
            <Dashboard user={this.state.user} verifyUser={this.verifyUser} />
          )}
        />
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
              signOut={this.signOut}
              ready={this.state.ready}
            />
          )}
        />
        <Route
          path="/login"
          component={_ => (
            <Login err={this.state.loginErr} findUser={this.findUser} />
          )}
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
                closeRefresh={this.closeRefresh}
                history={props.history}
                src={this.state.modalSrc}
                post={this.state.post}
                artist={this.state.artist}
                user={this.state.user}
                verifyUser={this.verifyUser}
                getPosts={this.getPosts}
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
                      closeRefresh={this.closeRefresh}
                      history={props.history}
                      src={this.state.modalSrc}
                      post={this.state.post}
                      artist={this.state.artist}
                      user={this.state.user}
                      verifyUser={this.verifyUser}
                      getPosts={this.getPosts}
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
                {this.verifyUser(this.state.user) ? (
                  this.verifyUser(this.state.user).admin ? (
                    <AddPhoto addPhoto={this.addPhoto} />
                  ) : null
                ) : null}
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
              getPosts={this.getPosts}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
