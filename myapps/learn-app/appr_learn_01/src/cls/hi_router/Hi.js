import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Component } from 'react';
import HiToReact from './HiToReact';
import HiToNodeJs from './HiToNodeJs';
import HiToProgrammer from './HiToProgrammer';

class Hi extends Component {
    render() {    
      return(<>
        <BrowserRouter>            
          <Routes>
            <Route path="/" element={<HiToReact/>} />
            <Route path="/react" element={<HiToReact/>} />
            <Route path="/node" element={<HiToNodeJs/>} />
            <Route path="/programmer/:programmer" element={<HiToProgrammer/>} />
          </Routes>
        </BrowserRouter>
      </>);
  }
}

export default Hi;


/*
### Use Case: ###
#1
**** App.js ****
import './App.css';
import Hi from './cls/hi_router/Hi';


function App() {
  return (
    <div className="App">
      <Hi/>
    </div>
  );
}

export default App;

*/