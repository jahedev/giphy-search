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

const API_URL = `http://api.giphy.com/v1/gifs/trending?api_key=sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT`;

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
    this.randomGIFS = this.searchGIFS.bind(this);
    this.trendingGIFS = this.searchGIFS.bind(this);
    this.searchInputChanged = this.searchInputChanged.bind(this);
  }

  searchGIFS = () => {
    axios.get(API_URL).then((res) => {
      let arr = [];
      if (!Array.isArray(res.data.data)) {
        arr.push(res.data.data);
        this.setState({ gifs: arr });
      } else this.props.onClick(res.data.data);
    });
  };

  randomGIFS = () => {};
  trendingGIFS = () => {};

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
