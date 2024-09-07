import { Component } from 'react'
import axios from 'axios';
class HelloCcApi extends Component{
    constructor(props){
        super(props);
        this.state = {greet: 'Loading....'}
    }
    async componentDidMount(){
        const network = axios.create({
            baseURL: 'http://localhost:8080',
            headers:{
                "Content-Type": "application/json"
            }
        });
        const response = await network.get("/hello");
        const data = response.data;
        
        this.setState({greet: data})
    }
    render(){
        return(
            <div>
                {this.state.greet} 
            </div>
        );
    }
}

export default HelloCcApi;