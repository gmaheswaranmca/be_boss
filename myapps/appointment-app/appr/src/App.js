import './App.css';
import CustomerLogin from './CustomerLogin';
import CustomerRegistration from './CustomerRegistration';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import FixAppointment from './FixAppointment';
import MainPage from './MainPage';

import AdminLogin from './AdminLogin';
import ViewAppointments from './ViewAppointments';
import HistoryOfAppointments from './HistoryOfAppointments';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
         
            <Route path='/customer/login' element={<CustomerLogin/>}/>
			
			      <Route path='/customer/register' element={<CustomerRegistration/>}/>
            <Route path='/appointment/create' element={<FixAppointment/>}/>

            <Route path='/admin/login' element={<AdminLogin/>}/>
            <Route path='/appointment/view' element={<ViewAppointments/>}/>
            <Route path='/appointment/history' element={<HistoryOfAppointments/>}/>

            <Route path='/*' element={<MainPage/>}/>  
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
