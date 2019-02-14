import React from "react";
import { Route, Redirect } from "react-router-dom";

import PhotoGrid from "./components/photoGrid";
import Modal from "./components/modal";
import MobileModal from "./components/mobileModal";
import Header from "./components/header";
import Login from "./components/login";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
}

const images = importAll(require.context("./images", false));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: "Jose Valenzuela",
      modalSrc: null,
      device: null,
      ready: false
    };
  }
  componentDidMount() {
    if (window.innerWidth <= 420) this.setState({ device: "mobile" });
    if (window.innerWidth <= 1024 && window.innerWidth > 420)
      this.setState({ device: "tablet" });
    if (window.innerWidth > 1024) this.setState({ device: "desktop" });
    this.setState({ ready: true });
  }
  handleClick = src => {
    if (window.innerWidth <= 420) this.setState({ device: "mobile" });
    if (window.innerWidth <= 1024 && window.innerWidth > 420)
      this.setState({ device: "tablet" });
    if (window.innerWidth > 1024) this.setState({ device: "desktop" });
    this.setState({ modalSrc: src, scroll: true });
    if (this.state.device !== "mobile") document.body.style.overflow = "hidden";
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
        <Route
          exact
          path="/"
          component={_ => <Header ready={this.state.ready} />}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/mobile"
          component={_ => {
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
          component={_ => {
            return (
              <>
                {this.state.modalSrc ? (
                  this.state.device === "mobile" ? (
                    <Redirect to="/mobile" />
                  ) : (
                    <Modal
                      close={this.close}
                      src={this.state.modalSrc}
                      artist={this.state.artist}
                    />
                  )
                ) : null}
                <PhotoGrid handleClick={this.handleClick} images={images} />
              </>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
