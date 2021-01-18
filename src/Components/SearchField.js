/*
 * SearchField Component is only reponsible for:
 *   1. displaying a searchfield and other search/filter options.
 *   2. return any array of gif urls or any other data related to
 *      user's search options back to App.js
 */

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

const API = {
  KEY: 'sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT',

  get TRENDING() {
    return `http://api.giphy.com/v1/gifs/trending?api_key=${this.KEY}`;
  },
  get RANDOM() {
    return `http://api.giphy.com/v1/gifs/random?api_key=${this.KEY}`;
  },
  get SEARCH_START() {
    return 'http://api.giphy.com/v1/gifs/search?q=';
  },
  get SEARCH_END() {
    return `&api_key=${this.KEY}`;
  },
};

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      inputvalue: '',
    };

    this.searchGIFS = this.searchGIFS.bind(this);
    this.randomGIFS = this.randomGIFS.bind(this);
    this.trendingGIFS = this.trendingGIFS.bind(this);
    this.getGIFS = this.getGIFS.bind(this);
    this.searchInputChanged = this.searchInputChanged.bind(this);
    this.moreGIFS = this.moreGIFS.bind(this);
    this.lessGIFS = this.lessGIFS.bind(this);
  }

  async componentDidMount() {
    this.trendingGIFS();
  }

  getGIFS = (URL) => {
    axios.get(URL).then((res) => {
      let data = res.data.data;
      let urls = [];

      for (const key in data) {
        const url = data[key].images['downsized'].url;
        const title = data[key].title;
        urls.push({ url: url, title: title });
      }

      this.props.onGifsRequest(urls);
    });
  };

  searchGIFS = () => {
    const SEARCH_QUERY = this.state.inputvalue.trim().split(' ').join('+');
    const API_SEARCH = API.SEARCH_START + SEARCH_QUERY + API.SEARCH_END;
    this.getGIFS(API_SEARCH);
  };

  randomGIFS = () => {
    axios.get(API.RANDOM).then((res) => {
      let url = res.data.data.images.downsized.url;
      let title = res.data.data.title;
      this.props.onGifsRequest([{ url: url, title: title }]);
    });
  };

  trendingGIFS = () => {
    this.getGIFS(API.TRENDING);
  };

  moreGIFS = () => {
    this.props.changeGifNum(+2);
  };

  lessGIFS = () => {
    this.props.changeGifNum(-2);
  };

  searchInputChanged(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div id='searchbar'>
          <input
            name='inputvalue'
            type='text'
            placeholder=' Type your search'
            value={this.state.inputvalue}
            onChange={this.searchInputChanged}
            id='searchInput'
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.searchGIFS();
            }}
          />
          <button onClick={this.searchGIFS} id='searchButton'>
            <span>Search</span>
          </button>
          <div id='filter'>
            <div id='filterbutton'>
              <button id='random-button' onClick={this.randomGIFS}>
                Random
              </button>
              <button id='trending-button' onClick={this.trendingGIFS}>
                Trending
              </button>
            </div>
            <div id='increament'>
              <span>Show:&nbsp;</span>
              <button onClick={this.moreGIFS}>More</button>
              <button onClick={this.lessGIFS}>Less</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchField;
