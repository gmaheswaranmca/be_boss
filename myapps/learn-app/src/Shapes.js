import { Component } from "react";

export class Square extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="square"></div>
        )
    }
}

export class CornerCurvedSquare extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="corner-curved-square"></div>
        )
    }
}

export class Circle extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="circle"></div>
        )
    }
}


/*
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Circle, CornerCurvedSquare, Square } from './Shapes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <a href="/square">Square</a> 
           | <a href="/circle">Circle</a>
           | <a href="/curve-square">Curved-Square</a>
        </div>
          <Routes>
            <Route path="/" element={<Square/>} />
            <Route path="/square" element={<Square/>} />
            <Route path="/circle" element={<Circle/>} />
            <Route path="/curve-square" element={<CornerCurvedSquare/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
*/