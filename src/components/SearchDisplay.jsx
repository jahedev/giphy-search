import axios from "axios";
import { Component } from "react";

export default class SearchDisplay extends Component {
  constructor(props) {
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
    //take the user's searchTerm, remove and replace any spaces with '+' sign.
    let search = this.state.searchTerm.split(" ").join("+");

    //have axios get the url by the user's search alongside the key.
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${this.state.key}`
      )
      .then((res) => {
        //this will take the response data and append it to the giphyData array
        this.setState({
          giphyData: res.data,
        });
      })
      .catch(console.error());

    setTimeout(() => {
      //grab the
      let data = this.state.giphyData.data.data;
      for (let i = 0; i < data.length; i++) {
        let url = data[i].images.original;
        this.state.giphyData.push(url);
      }
    }, 1000);
  }

  render() {
    return (
      <ul>
        {this.state.giphyData.map((url) => (
          <li>{url.url}</li>
        ))}
      </ul>
    );
  }
}
