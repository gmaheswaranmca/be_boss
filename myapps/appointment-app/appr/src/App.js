import './App.css';
import CustomerLogin from './CustomerLogin';
import CustomerRegistration from './CustomerRegistration';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Header';
import FixAppointment from './FixAppointment';
import MainPage from './MainPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/customer' element={<CustomerLogin/>}/>            
            <Route path='/customer/login' element={<CustomerLogin/>}/>
			
			<Route path='/customer/register' element={<CustomerRegistration/>}/>
            <Route path='/appointment/create' element={<FixAppointment/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
