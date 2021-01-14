import axios from "axios";
import { Component } from "react";

export default class SearchDisplay extends Component {
  constructor() {
    super(props);
    this.state = {
      key: this.props.key,
      searchTerm: this.props.searchTerm,
    };
  }

  //will update the search to the value from the textbox
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  async componentDidMount() {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${this.state.searchTerm}&api_key=${this.state.key}`
      )
      .then((res) => {
        //this will take the response data and append it to the giphyData array
        this.setState({
          giphyData: res.data,
        });
      })
      .catch(console.error());
  }

  render() {
    return (
      <ul>
        {this.state.giphyData.map((item) => (
          <li>{item.id}</li>
        ))}
      </ul>
    );
  }
}
