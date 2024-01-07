import { Component } from 'react'
import { SecurityDao, AdminDao }  from './CustomerDao'
import { withRouter} from './withRouter'
import LoadingPage from './LoadingPage'
import Header from './Header';

class ViewAppointmentsNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = {
			appointments:[],
			pageData :   {isLoggedIn: false, user: null, isLoading: true},
            count: 0,
            selectedAppointmentIndex:-1,
            selectedFor: 0
		};
    }
    async componentDidMount(){
        const securityDao = new SecurityDao()
        const adminDao = new AdminDao()
        const isLoggedIn = securityDao.isLoggedIn();
        const user = securityDao.getUser();
        
        if((!isLoggedIn) || (isLoggedIn && user.app !== 'admin')){
            this.props.router.navigate("/");//MAIN PAGE
            //window.location.reload();  
            return
        }

		
        const token = user.token;
		let pageData ={
			isLoggedIn:isLoggedIn, 
			user: user, 
            token: token,
			isLoading: true
		};
		
        //this.setState({pageData:pageData})				
		// call backend "/appointment/view" api 
        const appointments = await adminDao.viewAppointments(token);
		console.log(appointments)

		pageData = {...pageData, isLoading: false};
		

        //setInterval(() => {
            this.setState({ pageData: pageData, 
                            appointments: appointments.data.appointments})
            this.setState({count: this.state.count + 1})
            //}, 3000);
    }
    onGoForConfirm = async(id) => {
        const staff_name = prompt("Staff Name:","STAFF 1");
        if(!staff_name){
            return;
        }
        //alert(staff_name)
        const token = this.state.pageData.user.token;
        const adminDao = new AdminDao()
        const appointment = {
            id: id,
            staff: staff_name
        }
        const savedAppointment = await adminDao.confirmAppointment(appointment, token);
        console.log(savedAppointment);
        alert("Appointment has been confirmed");
        //window.location.reload()
        this.componentDidMount()
    }
    onGoForCancel = async(id) => {
        const cancel_reason = prompt("Cancellation Reason:","All staffs are busy");
        if(!cancel_reason){
            return;
        }
        //alert(cancel_reason)
        const token = this.state.pageData.user.token;
        const adminDao = new AdminDao()
        const appointment = {
            id: id,
            cancel_reason: cancel_reason
        }
        const savedAppointment = await adminDao.cancelAppointment(appointment, token);
        console.log(savedAppointment);
        alert("Appointment has been cancelled");
        //window.location.reload()
        this.componentDidMount();
    }
    render(){
        if(this.state.pageData.isLoading){
            return(
                <LoadingPage router={this.props.router}/>
            )
        }


        //<h3>View Appoointments {this.state.count}</h3>
        return(
<>  
    <Header router={this.props.router}/>
    <h3>View Appoointments</h3>
    <div className="container">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Car Name & Model</th>
                    <th>Appoitment Date</th>
                    <th>Service Type</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.appointments.map(e => 
                (<tr key={e.id}>
                    <td>{e.customer_name} ({e.mobile}, {e.location})</td>
                    <td>{e.car_name} {e.model}</td>
                    <td>{e.appointment_date.substr(0,10)}</td>
                    <td>{e.service_type}</td>
                    <td>
                        <button type="button" className="btn btn-primary" onClick={(event) => {this.onGoForConfirm(e.id);}}>Confirm</button> &nbsp;
                        <button type="button" className="btn btn-warning" onClick={(event) => {this.onGoForCancel(e.id);}}>Cancel</button>
                    </td>
                </tr>)
                    )
                }
            </tbody>
        </table>
    </div>                
</>
        )
    }
}

const ViewAppointments = withRouter(ViewAppointmentsNoRouter)
export default ViewAppointments 