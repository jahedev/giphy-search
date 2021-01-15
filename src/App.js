import React from 'react';
import axios from 'axios';
import GifCard from './GifCard';
import './App.css';

const api_key = 'Tcvfb5T203klYiuSxcutNyJy7qnIzLmT';
// const search_query = 'big+chungus';
// const api_str = `http://api.giphy.com/v1/gifs/search?q=${search_query}&api_key=${api_key}`;
const api_str = `http://api.giphy.com/v1/gifs/search?q=`;

let x = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      query: 'search',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const query = this.state.query.split(' ').join('+');
    const api_link = `${api_str}${query}&api_key=${api_key}`;

    let data;

    axios.get(api_link).then((res) => {
      data = res;
    });

    setTimeout(() => {
      // We're using setTimeout, otherwise the 'data.data' properties are not found
      data = data.data.data;
      let urls = [];
      for (const key in data) {
        const url = data[key].images['downsized'].url;
        urls.push(url);
      }
      this.setState({ gifs: urls });
    }, 1000);
  }

  search() {}

  handleChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  render() {
    x = 0;
    return (
      <div className='App'>
        <div className='search-container'>
          <h1>Search for GIFs</h1>
          <span className='label'>Search:&nbsp;</span>
          <input
            name='searchinput'
            placeholder='e.g. The Office'
            onChange={this.handleChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.componentDidMount();
            }}
          />
        </div>
        <ul>
          {this.state.gifs.map((src) => (
            <li>
              {/* <img key={++x} src={src} /> */}
              <GifCard imgsrc={src} />;
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
