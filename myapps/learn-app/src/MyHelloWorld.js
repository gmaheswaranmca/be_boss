import { Component } from "react";

class MyHelloWorld extends Component{
    render(){
        return(
            <p>Hello World!!!</p>
        )
    }
}
class VisitorCounter extends Component{
    constructor(props){
        super(props);
        this.state = {count : 0}
    }
    onCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render(){
        return(
            <>
                <input type="button"
                    value={this.state.count}
                    onClick={this.onCount}
                    style={{color:'orange', backgroundColor:'white',
                        width:"100px",height:"100px",
                        borderRadius:'10px', fontSize:'20pt'
                         }}
                    />
            </>
        )
    }
}
export default MyHelloWorld;
export {VisitorCounter}