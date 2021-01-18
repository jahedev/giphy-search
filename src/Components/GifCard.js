import React, { Component } from 'react';

class GifCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='grid-item'>
        <img src={this.props.src} className='gifimage' />
        <p className='giftitle'>{this.props.title}</p>
      </div>
    );
  }
}

export default GifCard;
