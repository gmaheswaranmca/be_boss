import { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Circle  from './Circle';
import CornerCurvedSquare  from './CornerCurvedSquare';
import Square  from './Square';
import './Shapes.css'

export default class Shapes extends Component {
    
    render() {
        return(
            <>
                <BrowserRouter>
                    <div>
                    <a href="/square">Square</a> | <a href="/circle">Circle</a> | <a href="/curve-square">Curved-Square</a>
                    </div>
                    <Routes>
                        <Route path="/" element={<Square/>} />
                        <Route path="/square" element={<Square/>} />
                        <Route path="/circle" element={<Circle/>} />
                        <Route path="/curve-square" element={<CornerCurvedSquare/>} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}



/*
### Use Case: ###
#1
**** App.js ****
import './App.css';
import Shapes from './cls/shapes_router/Shapes';


function App() {
  return (
    <div className="App">
      <Shapes/>
    </div>
  );
}

export default App;

*/
