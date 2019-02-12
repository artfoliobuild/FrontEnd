import React from 'react';

import PhotoGrid from "./components/photoGrid"

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => images[item.replace('./', '')] = r(item));
  return images;
}

const images = importAll(require.context('./images', false));

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PhotoGrid images={images} />
      </div>
    );
  }
}

export default App;
