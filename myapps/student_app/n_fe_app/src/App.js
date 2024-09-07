
import './App.css';
import CreateStudent from './components/CreateStudent';
import EditStudent from './components/EditStudent';
import HelloCC from './components/HelloCC'
import HelloCcApi from './components/HelloCcApi';

import HelloFC from './components/HelloFC';
import HelloFcApi from './components/HelloFcApi';
import StudentList from './components/StudentList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Student App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link" href="/">Student</a></li>
                        </ul>
                    </div>
                    <div className="d-flex">   
                        &nbsp;
                    </div>
                </div>
        </nav>
        <BrowserRouter>            
          <Routes>
            <Route path="/" element={<StudentList/>} />
            <Route path="/student" element={<StudentList/>} />
            <Route path="/student/list" element={<StudentList/>} />
            <Route path="/student/create" element={<CreateStudent/>} />
            <Route path="/student/edit/:id" element={<EditStudent/>} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
