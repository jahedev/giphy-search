import React, { Component } from 'react';

class GifCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class='grid-item'>
        <img src={this.props.src} className='gifimage' />
      </div>
    );
  }
}

export default GifCard;
