import { Component } from 'react'
import CustomerDao, { SecurityDao }  from './CustomerDao'
import { withRouter} from './withRouter'
import LoadingPage from './LoadingPage'

class FixAppointmentNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = {
			appointment:{
				car_name: '', 
				model: '', 
				appointment_date: '', 
				service_type: ''
			},
			pageData :   {isLoggedIn: false, user: null, isLoading: true}
		};
    }
    componentDidMount(){
        const securityDao = new SecurityDao()
        const isLoggedIn = securityDao.isLoggedIn();
		const user = securityDao.getUser();
		let pageData ={
			isLoggedIn:isLoggedIn, 
			user: user, 
			isLoading: true
		};
		
        this.setState({pageData:pageData})
		
        if(!isLoggedIn){
            this.props.router.navigate("/");//MAIN PAGE
            window.location.reload();  
            return
        }
		
		// GET Latest created appointment if any //TODO
		
		pageData = {...pageData, isLoading: false};
		
        this.setState({ pageData: pageData})
    }
    onBoxChange = (e) => {
        let appointment = {...this.state.appointment}
        appointment[e.target.id] = e.target.value;
        this.setState({appointment: appointment})
    }
    onFixAppointment = async(e) => {
        const dao = new CustomerDao();

        try{
			console.log(this.state.pageData);
			if(!window.confirm("Are you sure to fix the appointment?")){
				return;
			}
            const newAppointment = {
                ...this.state.appointment, 
                customer_id: this.state.pageData.user.customer_id
            };
			const token = this.state.pageData.user.token;
            const savedAppointment = await dao.fixAppointment(newAppointment, token);
            console.log(savedAppointment) //XXXXX

            alert('Appointment has been fixed successfully')

            this.props.router.navigate("/appointment/create");
            window.location.reload();  
        }catch(error){
            console.log(error)   //XXXXX
            alert('Server Error')
        }
    }
    render(){
        if(this.state.isLoading){
            return(
                <LoadingPage/>
            )
        }

        return(
            <>  
               <div className="container">
                    <form>    
                        <h1 className="h3 mb-3 fw-normal">Fix appointment</h1>
                        <div className="form-floating">
                            <input type="text" 
                                	className="form-control" 
                                    id="car_name" 
                                    placeholder="Car Name"
                                    value={this.state.appointment.car_name}
                                    onChange={this.onBoxChange}
                                    />
                            <label htmlFor="car_name">Car Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="model" 
                                placeholder="Model"
                                value={this.state.appointment.model}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="model">Model</label>
                        </div>
                        <div className="form-floating">
                            <input type="date" 
                                className="form-control" 
                                id="appointment_date" 
                                placeholder="Appointment Date"
                                value={this.state.appointment.appointment_date}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="appointment_date">Appointment Date</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="service_type" 
                                placeholder="Service Type"                                
                                value={this.state.appointment.service_type}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="service_type">Service Type</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary"
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