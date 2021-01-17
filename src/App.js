//import './App.css';
import React, { Component } from 'react';
import SearchField from './components/SearchField';
import GifLayout from './components/GifLayout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
    };

    this.displayGIFS = this.displayGIFS.bind(this);
  }

  displayGIFS = (gifs) => {
    this.setState({ gifs: gifs });
  };

  render() {
    return (
      <div>
        <SearchField onClick={this.displayGIFS} />
        <GifLayout />
      </div>
    );
  }
}

export default App;
