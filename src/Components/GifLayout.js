import React, { Component } from 'react';
import GifCard from './GifCard';

export default class GifLayout extends Component {
  constructor(props) {
    super(props);
    // this.props.gifs
  }
  render() {
    return (
      <div className='gif-layout'>
        {this.props.gifs.map((img_url, i) => (
          <div>
            <GifCard key={i} src={img_url} />
          </div>
        ))}
      </div>
    );
  }
}
