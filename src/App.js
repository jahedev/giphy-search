//import './App.css';
import React, {Component} from 'react'
import SearchField from './Components/SearchField'




class App extends Component {
  constructor(props){
    super(props)
    this.state={
        gifs: this.props.gifs

    }
  }  
  


  render(){
    return(
      <div>
           <SearchField />
     </div>

    );
  }
}

export default App;
