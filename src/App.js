import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";
import SearchDisplay from "./components/SearchDisplay";

const apiCall = "http://api.giphy.com/v1/gifs/search?q=";
const key = "sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "food",
      giphyData: [],
      url: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  //handle search will take an event and assign that to searchTerm
  handleSearch = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  redner() {
    return (
      <div className="App">
        <header className="App-header">
          <form>
            <label>
              Search:
              <input type="text" onChange={this.handleSearch}></input>
            </label>
          </form>
          <SearchDisplay searchTerm={this.state}></SearchDisplay>
        </header>
      </div>
    );
  }
}
