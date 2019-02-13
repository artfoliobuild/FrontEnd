import React from 'react';

import PhotoGrid from "./components/photoGrid"
import Modal from "./components/modal"

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => images[item.replace('./', '')] = r(item));
  return images;
}

const images = importAll(require.context('./images', false));

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      artist: "Jose Valenzuela",
      modalSrc: null
    }
  }
  handleClick = src => {
    this.setState({ modalSrc: src });
  }
  render() {
    return (
      <div className="App">
        {this.state.modalSrc ? <Modal src={this.state.modalSrc} artist={this.state.artist} /> : null}
        <PhotoGrid handleClick={this.handleClick} images={images} />
      </div>
    );
  }
}

export default App;
