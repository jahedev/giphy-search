import React from 'react';
import axios from 'axios';
import './App.css';

const api_key = 'Tcvfb5T203klYiuSxcutNyJy7qnIzLmT';
const search_query = 'basketball';
const api_str = `http://api.giphy.com/v1/gifs/search?q=${search_query}&api_key=${api_key}`;

let x = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      urls: [],
    };
  }

  componentDidMount() {
    axios.get(api_str).then((res) => {
      this.setState({ gifs: res });
    });

    setTimeout(() => {
      let data = this.state.gifs.data.data;
      let urls = [];
      for (const key in data) {
        const url = data[key].images['downsized'].url;
        this.state.urls.push(url);
        this.setState({ urls: urls });
      }
    }, 1000);
  }

  render() {
    return (
      <div className='App'>
        <ul>
          {this.state.urls.map((src) => (
            <li>
              <img key={++x} src={src} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
