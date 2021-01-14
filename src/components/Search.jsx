import axios from "axios";
import { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.searchTerm,
    };
  }

  //will update the search to the value from the textbox
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  //
  handleSearch = (event) => {
    //stops the browser from reloading the page.
    event.preventDefault();
    let search = {
      searchTerm: this.state.searchTerm,
    };
    //post the changes using axios to the api and pass along the user object.
    axios.post(`url`, { search }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <label>
          Search:
          <input type="text" name="search" onChange={this.handleChange}></input>
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}
