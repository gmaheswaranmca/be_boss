import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GreetHi from './GreetHi';
import GreetHello from './GreetHello';
import GreetMorning from './GreetMorning';

export default function Greeting(){
    return(
        <>
          <BrowserRouter>
              <div>
              <a href="/hi">Say Hi!!!</a> | <a href="/hello">Say Hello!!!</a> 
              <br/>
              <a href="/good-morning/kapildev">Say Morning To kapildev!!!</a> | <a href="/good-morning/gavaskar">Say Morning To gavaskar!!!</a>
              </div>
              <Routes>
                  <Route path="/" element={<GreetHi/>} />
                  <Route path="/hi" element={<GreetHi/>} />
                  <Route path="/hello" element={<GreetHello/>} />
                  <Route path="/good-morning/:fullname" element={<GreetMorning/>} />
              </Routes>
          </BrowserRouter>
        </>
    )
}



/*
### Use Case: ###
#1
**** App.js ****
import './App.css';
import Greeting from './fns/counter/Greeting';


function App() {
  return (
    <div className="App">
      <Greeting/>
    </div>
  );
}

export default App;

*/