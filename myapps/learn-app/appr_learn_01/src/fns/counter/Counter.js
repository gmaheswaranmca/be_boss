import './Counter.css';
import {useState} from 'react'

function Counter(){
  const count = 0;
  const [counter,setCounter] = useState(count);

  const doClick = () =>{
    setCounter(counter  + 1)
  };
  return (
    <div>
      <input class="box" type="button" value={counter} onClick={doClick}/>
    </div>
  );
}

export default Counter;

/*
### Use Case: ###
#1
**** App.js ****
import './App.css';
import Counter from './fns/counter/Counter';


function App() {
  return (
    <div className="App">
      <Counter/>
    </div>
  );
}

export default App;

*/