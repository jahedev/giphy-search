import React, { Component } from 'react';
import GifCard from './GifCard';

export default class GifLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const numOfGifs = this.props.numOfGifs;
    return (
      <div className='gif-layout'>
        {this.props.gifs.map((gif, i) =>
          i <= numOfGifs ? (
            <GifCard key={i} title={gif.title} src={gif.url} />
          ) : (
            ''
          )
        )}
      </div>
    );
  }
}
