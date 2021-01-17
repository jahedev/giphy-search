import React, {Component} from 'react'

class GifGard extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            
           <div class="grid-item">
                 <p className="giftitle">{this.props.title}</p>

                 <img src={this.props.src} className="gifimage"/>
                
           </div>
           

        );
    }
}



export default GifGard