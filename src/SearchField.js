import React, { Component } from 'react';
import RandomSearch from './RandomSearch';
import TrendingSearch from './TrendingSearch';
import QuerySearch from './QuerySearch';

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchType: 'random' OR 'trending' OR 'search' <-- default
      searchType:
        (props.searchType == 'random' && 'random') ||
        (props.searchType == 'trending' && 'trending') ||
        'search',
      // make sure (0 < props.items <= 50) otherwise default to 50
      items: props.items <= 50 && props.items > 0 ? props.items : 50,
    };
  }
  render() {
    const searchType = this.state.searchType;
    let component;

    if (searchType == 'random') component = <RandomSearch />;
    else if (searchType == 'trending') component = <TrendingSearch />;
    else component = <QuerySearch />;

    return <div className='search-field'>{component}</div>;
  }
}
