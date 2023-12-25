import { Component } from 'react'
export default class LoadingPage extends Component{
    constructor(props){
        super(props)
        this.state = { }
    }
    
    render(){
        
        return(
            <>  
               <div className="container" style={{padding:'200px'}}>
                    Loading...
                </div>                
            </>
        )
    }
}

