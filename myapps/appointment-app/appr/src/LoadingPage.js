import { Component } from 'react'
import Header from './Header';

export default class LoadingPage extends Component{
    constructor(props){
        super(props)
        this.state = { }
    }
    
    render(){
        
        return(
                
            <>  <Header router={this.props.router}/>
               <div className="container" style={{padding:'200px'}}>
                    Loading...
                </div>                
            </>
        )
    }
}

