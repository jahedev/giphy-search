import React, { Component } from 'react';

export default class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc: props.imgsrc,
    };
  }
  render() {
    return (
      <div className='gif-card'>
        <img src={this.state.imgsrc} />
      </div>
    );
  }
}
