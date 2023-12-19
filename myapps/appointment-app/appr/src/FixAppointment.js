import { Component } from 'react'
import CustomerDao  from './CustomerDao'
import { Navigate } from 'react-router-dom'
import { withRouter} from './withRouter'

class FixAppointmentNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = {car_name: '', model: '', 
                appointment_date: '', 
                service_type: '',
                isLoggedIn: true}
    }
    componentDidMount(){
        const dao = new CustomerDao()
        const isLoggedIn = dao.isLoggedIn();
        this.setState({isLoggedIn:isLoggedIn, user: dao.getUser()})
        if(!isLoggedIn){
            this.props.router.navigate("/customer/login");
            window.location.reload();  
        }
    }
    onBoxChange = (e) => {
        let entity = {}
        entity[e.target.id] = e.target.value;
        this.setState(entity)
    }
    onFixAppointment = async(e) => {
        
    }
    render(){
        
        return(
            <>  
               <div className="container">
                    <form>    
                        <h1 class="h3 mb-3 fw-normal">Fix appointment</h1>
                        <div class="form-floating">
                            <input type="text" 
                                	className="form-control" 
                                    id="car_name" 
                                    placeholder="Car Name"
                                    value={this.state.car_name}
                                    onChange={this.onBoxChange}
                                    />
                            <label forName="car_name">Car Name</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="model" 
                                placeholder="Model"
                                value={this.state.model}
                                onChange={this.onBoxChange}/>
                            <label forName="model">Model</label>
                        </div>
                        <div class="form-floating">
                            <input type="date" 
                                class="form-control" 
                                id="appointment_date" 
                                placeholder="Appointment Date"
                                value={this.state.appointment_date}
                                onChange={this.onBoxChange}/>
                            <label for="appointment_date">Appointment Date</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="service_type" 
                                placeholder="Service Type"                                
                                value={this.state.service_type}
                                onChange={this.onBoxChange}/>
                            <label forName="service_type">Service Type</label>
                        </div>
                        <button class="w-100 btn btn-lg btn-primary"
                            type="button"
                            onClick={this.onFixAppointment}>Fix Appointment</button>
                    </form>
                </div>                
            </>
        )
    }
}

const FixAppointment = withRouter(FixAppointmentNoRouter)
export default FixAppointment 