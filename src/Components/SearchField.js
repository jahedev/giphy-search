import React, {Component} from 'react'
import '../App.css';
import axios from 'axios'
import  './Grid.css'
import GifGard from './GifGard'


class Search extends Component{
    constructor(props){
        super(props)
        this.state ={
            gifs: [],
            inputvalue: 'mom'
        }

        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(e){
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }

    async componentDidMount() {
        axios.get(`http://api.giphy.com/v1/gifs/search?q=${this.state.inputvalue}&api_key=sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT`)
        .then((res) => {
          this.setState({ gifs: res.data.data });
        });
    }
    render(){
        
        return(

            <div>
                <div id="searchbar">
                  <input name="inputvalue" type="text" placeholder=" type your search" value={this.state.inputvalue} onChange={this.changeHandler} id="searchInput"/>
                   
                  
                  <button onClick={()=>this.componentDidMount()} id="searchButton"> Search </button>
              <div id="filter">
                <div id="filterbutton">
                    <button id="button1"> Random </button>
                    <button id="button2">Tranding</button>
                </div>

                  <div id="increament">
                       Number Of Gifs
                      <button > + </button>
                      <button > - </button>
                  </div>

            </div>

                 
                </div>

                <div class="grid-container">  
                  {
                     this.state.gifs.map((item, index) => 

                         <div> <GifGard key={index} src={item.images['downsized'].url} title={item.title}/> </div>
             
                    ) 
                  } 
                </div>  
            </div>
           

        );
    }
}


export default Search