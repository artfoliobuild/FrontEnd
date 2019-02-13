import React from 'react';
import { Route } from 'react-router-dom';

import PhotoGrid from "./components/photoGrid"
import Modal from "./components/modal"
import Header from "./components/header"

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => images[item.replace('./', '')] = r(item));
  return images;
}

const images = importAll(require.context('./images', false));

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artist: "Jose Valenzuela",
      modalSrc: null
    }
  }
  handleClick = src => {
    this.setState({ modalSrc: src, scroll: true });
  }
  close = e => {
    e.stopPropagation();
    this.setState({ modalSrc: null, scroll: false });
  }
  render() {
    return (
      <div className={`App${this.state.scroll ? ' noscroll' : ''}`}>
        <Route path="/" component={Header} />
        <Route path="/home" component={_ => {
          return (<>
            {this.state.modalSrc ? <Modal close={this.close} src={this.state.modalSrc} artist={this.state.artist} /> : null}
            <PhotoGrid handleClick={this.handleClick} images={images} />
          </>)
        }}>
        </Route>
      </div >
    );
  }
}

export default App;
