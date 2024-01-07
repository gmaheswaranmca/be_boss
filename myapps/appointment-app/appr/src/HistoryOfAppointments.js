import { Component } from 'react'
import { SecurityDao, AdminDao }  from './CustomerDao'
import { withRouter} from './withRouter'
import LoadingPage from './LoadingPage'
import Header from './Header';

class HistoryOfAppointmentsNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = {
			appointments:[],
			pageData :   {isLoggedIn: false, user: null, isLoading: true},
            count: 0,
            historyType: 4
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
        const appointments = await adminDao.historyOfAppointments(this.state.historyType, token);
		console.log(appointments)

		pageData = {...pageData, isLoading: false};
		

        //setInterval(() => {
            this.setState({ pageData: pageData, 
                            appointments: appointments.data.appointments})
            this.setState({count: this.state.count + 1})
            //}, 3000);
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
    <h3>History Of Appointments</h3>
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
                        {
                            e.status === 2 && 
                            <span>Staff: {e.staff}</span>
                        }
                        {
                            e.status === 3 && 
                            <span>Cancelled Reason: {e.cancel_reason}</span>
                        }
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

const HistoryOfAppointments = withRouter(HistoryOfAppointmentsNoRouter)
export default HistoryOfAppointments 