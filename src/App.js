import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";
import SearchDisplay from "./components/SearchDisplay";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      key: "sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT",
      id: "",
      searchTerm: "food",
      giphyData: [],
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
          <SearchDisplay></SearchDisplay>
        </header>
      </div>
    );
  }
}
