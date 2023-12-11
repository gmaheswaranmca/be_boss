import { Component } from "react";
import './MyCounter.css'
class MyCounter extends Component{
    constructor(props){
        super(props)
        this.state = {count:0}
    }

    doCount = () => {
        this.setState({count: this.state.count + 1})
    }

    render(){
        return(
            <input type="button" className="box" 
                value={this.state.count} 
                onClick={this.doCount}/>
        )
    }
}

export default MyCounter;