import { Component } from 'react'


function intInput(title){
    return new Promise((resolve, reject)=>{
        let data = prompt(title);
        if(data !== ''){            
            data = parseInt(data)
            if(isNaN(data))
            {
                reject({message: 'Not a Number'})
            }
            
            resolve(data)
        }else{
            reject({message: 'Empty Data'})
        }
    });
}

export default class InputThree extends Component{
    constructor(props){
        super(props)
        this.state = {num1:0,num2:0,sum:0}
    }
    onInput = async() => {        
        let a = 0;
        let b = 0; 
        try{
            a = await intInput('Enter number 1:')   
        }catch(err){
            console.log(err)
        }
        try{
            b = await intInput('Enter number 2:')   
        }catch(err){
            console.log(err)
        }
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
