import './App.css';
import {useState} from 'react'

function Counter(){
  const count = 0;
  const [counter,setCounter] = useState(count);

  const doClick = () =>{
    setCounter(counter  + 1)
  };
  return (
    <div>
      <input type="button" value={counter} onClick={doClick}/>
    </div>
  );
}

export default Counter;
