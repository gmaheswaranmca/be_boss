import { Component } from 'react'
import bulkUploadEmployeeDao  from './BulkUploadEmpDao'
import { Chart } from "react-google-charts"


function intInput (caption){
    return parseInt(prompt(caption))
}

export default class Input1 extends Component{
    constructor(props){
        super(props)
        this.state = {num1 :  0 , num2 : 0, sum : 0}
    }    
    onInput = (e) => {       
        let a = intInput('Enter number 1:');
        let b = intInput('Enter number 2:');
        let c = a + b;
        this.setState({num1: a, num2: b, sum: c});
    }
    
    render(){       
        return (
            <>
                <p>Number 1: {this.state.num1}</p>
                <p>Number 2: {this.state.num2}</p>
                <p><input type="button" value="Input" onClick={this.onInput}/></p>
                <p>Sum: {this.state.sum}</p>                
            </>        
        )
    }
}
