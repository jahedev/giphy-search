//import './App.css';
import React, { Component } from 'react';
import SearchField from './components/SearchField';
import GifLayout from './components/GifLayout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      numOfGifs: 50,
    };

    this.displayGIFS = this.displayGIFS.bind(this);
    this.changeGifNum = this.changeGifNum.bind(this);
  }

  displayGIFS = (gifs) => {
    this.setState({ gifs: gifs });
  };

  changeGifNum = (n) => {
    const currentVal = this.state.numOfGifs;
    const futureVal = currentVal + n;

    if (futureVal > 1 && futureVal < 50) {
      this.setState({ numOfGifs: futureVal });
    } else if (futureVal >= 50) this.setState({ numOfGifs: 50 });
  };

  render() {
    return (
      <div>
        <SearchField
          onGifsRequest={this.displayGIFS}
          changeGifNum={this.changeGifNum}
        />
        <GifLayout numOfGifs={this.state.numOfGifs} gifs={this.state.gifs} />
      </div>
    );
  }
}

export default App;
