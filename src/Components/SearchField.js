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
            inputvalue: ' ',
            numberGif:1
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

    


    async componentDidMount(arg) {
        
     
        axios.get(arg)
        .then((res) => {
            let arr = []
            if(!Array.isArray(res.data.data)){arr.push(res.data.data); this.setState({ gifs: arr }) }
            else this.setState({ gifs: res.data.data });
        });  
        

    }

   

    render(){

        return(

            <div>
                <div id="searchbar">
                  <input name="inputvalue" type="text" placeholder=" type your search" value={this.state.inputvalue} onChange={this.changeHandler} id="searchInput"/>
                   
                  
                  <button onClick={()=>this.componentDidMount(`http://api.giphy.com/v1/gifs/search?q=${this.state.inputvalue.trim()}&api_key=sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT`)} id="searchButton"> Search </button>
              <div id="filter">
                  <div id="filterbutton">
                    <button id="button1" onClick={()=>this.componentDidMount(`http://api.giphy.com/v1/gifs/random?api_key=sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT`)}> Random </button>
                    <button id="button2" onClick={()=>this.componentDidMount(`http://api.giphy.com/v1/gifs/trending?api_key=sc71PXHt3BEJg208Ct4xBM6K5OTbJ4BT`)}>Tranding</button>
                     
                  </div>

                  <div id="increament">
                       Number Of Gifs
                      <button onClick={()=>{if(this.state.numberGif < this.state.gifs.length) this.setState({numberGif: this.state.numberGif +1})}}> + </button>
                      <button   onClick={()=>{if(this.state.numberGif >0) this.setState({numberGif: this.state.numberGif - 1})}}> - </button>
                   </div>

               </div>

                 
                </div>

                <div class="grid-container">
                                        
                    {                     
                        this.state.gifs.map((item, index) => 

                           (index < this.state.numberGif) ? <div>  <GifGard key={index} src={item.images['original'].url} title={item.title}/> </div> : ''
                        ) 

                    }
                </div>  
            </div>
           

        );
    }
}


export default Search