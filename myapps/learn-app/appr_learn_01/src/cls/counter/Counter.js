import { Component } from "react";
import './Counter.css'
class Counter extends Component {
    constructor(props){
        super(props)
        this.state = { count : 0 }
    }

    doCount = () => {
        this.setState( { count : this.state.count + 1 } )
    }

    render(){
        return(
            <input type="button" className="box" 
                value={this.state.count} 
                onClick={this.doCount}/>
        )
    }
}

export default Counter;


/*
### Use Case: ###
#1
**** App.js ****
import './App.css';
import Counter from './cls/counter/Counter';


function App() {
  return (
    <div className="App">
      <Counter/>
    </div>
  );
}

export default App;

*/