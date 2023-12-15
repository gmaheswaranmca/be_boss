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

export default class InputTwo extends Component{
    constructor(props){
        super(props)
        this.state = {num1:0,num2:0,sum:0}
    }
    onInput = () => {        
        let thenFn1=(data)=>{            
            let a = data;
            let thenFn2 = (data2)=>{
                let b = data2;
                let c = a + b;
                this.setState({num1:a,num2:b,sum:c})
            };
            let catchFn2=(err2)=>{
                console.log(err2)
            };
            intInput('Enter Input 2:').then(thenFn2).catch(catchFn2)
        };
        let catchFn1=(err)=>{
            console.log(err)
        };
        intInput('Enter Input 1:').then(thenFn1).catch(catchFn1)
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
