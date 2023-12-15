import { Component } from 'react'


function intInput(title){
    return parseInt(prompt(title))
}

export default class InputOne extends Component{
    constructor(props){
        super(props)
        this.state = {num1:0,num2:0,sum:0}
    }
    onInput = () => {
        let a = intInput('Enter Input 1:')
        let b = intInput('Enter Input 2:')
        let c = a + b
        this.setState({num1:a,num2:b,sum:c})
    }
    
    render(){
       
        return (
            <>
               <p>First Number: {this.state.num1}</p>
               <p>Second Number: {this.state.num2}</p>
               <div><input type="button" value="Input" onClick={this.onInput}/></div>
               <p>Sum: {this.state.sum}</p>
            </>
        
        )
    }
}
