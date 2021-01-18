/*
 * SearchField Component is only reponsible for:
 *   1. displaying a searchfield and other search/filter options.
 *   2. return any array of gif urls or any other data related to
 *      user's search options back to App.js
 */

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import GifGard from './GifCard';

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
      inputvalue: ' ',
      numberGif: 1,
      // this.props.displayGIFS
    };

    this.searchGIFS = this.searchGIFS.bind(this);
    this.randomGIFS = this.randomGIFS.bind(this);
    this.trendingGIFS = this.trendingGIFS.bind(this);
    this.getGIFS = this.getGIFS.bind(this);
    this.searchInputChanged = this.searchInputChanged.bind(this);
  }

  getGIFS = (URL) => {
    let gifs_obj;

    axios.get(URL).then((res) => {
      gifs_obj = res;
    });

    setTimeout(() => {
      let data = gifs_obj.data.data;
      let urls = [];
      for (const key in data) {
        const url = data[key].images['original'].url;
        urls.push(url);
      }
      this.props.onClick(urls);
    }, 1000);
  };

  searchGIFS = () => {
    const SEARCH_QUERY = this.state.inputvalue.trim();
    console.log(SEARCH_QUERY);
    const API_SEARCH = API.SEARCH_START + SEARCH_QUERY + API.SEARCH_END;
    this.getGIFS(API_SEARCH);
  };

  randomGIFS = () => {
    let img_url;

    axios.get(API.RANDOM).then((res) => {
      img_url = res.data.data.images.original.url;
      this.props.onClick([img_url]);
    });
  };

  trendingGIFS = () => {
    this.getGIFS(API.TRENDING);
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
            placeholder=' type your search'
            value={this.state.inputvalue}
            onChange={this.searchInputChanged}
            id='searchInput'
          />

          {/* <button
            onClick={() =>
              this.componentDidMount(
                `http://api.giphy.com/v1/gifs/search?q=${this.state.inputvalue.trim()}&api_key=sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT`
              )
            }
            id='searchButton'
          > */}
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
              <span>Number Of Gifs</span>
              <button
                onClick={() => {
                  if (this.state.numberGif < this.state.gifs.length)
                    this.setState({ numberGif: this.state.numberGif + 1 });
                }}
              >
                More
              </button>
              <button
                onClick={() => {
                  if (this.state.numberGif > 0)
                    this.setState({ numberGif: this.state.numberGif - 1 });
                }}
              >
                Less
              </button>
            </div>
          </div>
        </div>

        {/* <div class='grid-container'>
          {this.state.gifs.map((item, index) =>
            index < this.state.numberGif ? (
              <div>
                {' '}
                <GifGard
                  key={index}
                  src={item.images['original'].url}
                  title={item.title}
                />{' '}
              </div>
            ) : (
              ''
            )
          )}
        </div> */}
      </div>
    );
  }
}

export default SearchField;
