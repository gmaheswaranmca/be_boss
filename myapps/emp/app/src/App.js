import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import JobTitleBasedSalaries from './JobTitleBasedSalaries';
import BulkUploadEmployee from './BulkUploadEmployee';
import Dashboard from './Dashboard';
import InputOne from './InputOne';
import InputTwo from './InputTwo';
import InputThree from './InputThree';

function App() {
  return (
    <div className="App">
     
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <div ><a href="/" className="navbar-brand">Employee App</a> </div>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item"><a className="nav-link" href="/">Dashboard</a></li>
                  <li className="nav-item"><a className="nav-link" href="/job-title-vs-salary">Job vs Total Salary</a></li>
                  <li className="nav-item"><a className="nav-link" href="/upload-bulk">Bulk Upload</a></li>
                  <li className="nav-item"><a className="nav-link" href="/input1">i/p 1</a></li>
                  <li className="nav-item"><a className="nav-link" href="/input2">i/p 2</a></li>
                  <li className="nav-item"><a className="nav-link" href="/input3">i/p 3</a></li>
                </ul>
              </div>
            </div>
        </nav>
      
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/job-title-vs-salary" element={<JobTitleBasedSalaries/>}/>
          <Route path="/upload-bulk" element={<BulkUploadEmployee/>}/>          
          <Route path="/input1" element={<InputOne/>}/> 
          <Route path="/input2" element={<InputTwo/>}/> 
          <Route path="/input3" element={<InputThree/>}/> 
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
