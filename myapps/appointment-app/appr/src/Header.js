import { Component } from 'react'
import { SecurityDao }  from './CustomerDao'

export default class Header extends Component{
    
    constructor(props){
        super(props)
        this.state = {isLoggedIn: false, user: null, isLoggedOut: false}        
    }
    componentDidMount(){
        const securityDao = new SecurityDao()
        const isLoggedIn = securityDao.isLoggedIn();
        this.setState({isLoggedIn:isLoggedIn, user: securityDao.getUser()})
    }
    onLogout = (e) => {
        const securityDao = new SecurityDao()
        securityDao.doLogout();
        this.setState({isLoggedIn:false, user: null, isLoggedOut: true})
        this.props.router.navigate("/");
        //window.location.reload()
    }
    render(){
        let ui;

if(this.state.isLoggedIn && this.state.user.app === 'customer'){ //Customer Logged In
    const uiCustomerLoggedIn = 
(<>        
<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <a className="navbar-brand" href="/appointment/create">Carwash App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="/appointment/create">Appointment</a>
                </li>
            </ul>
        </div>
        <div className="d-flex">   
            <span style={{maxWidth:'200px'}}>{this.state.user ? this.state.user.name : 'No User'}!!!</span>
            <button className="btn btn-info" type="button" onClick={this.onLogout}>Logout</button>
        </div>
    </div>
</nav>
</>);
    ui = uiCustomerLoggedIn;
}//End Customer Logged In
else if(this.state.isLoggedIn && this.state.user.app === 'admin'){//Admin Logged In
const uiAdminLoggedIn = 
(<>        
<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <a className="navbar-brand" href="/appointment/view">Carwash App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="/appointment/view">View Appointments</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/appointment/history">History Of Appointments</a>
                </li>
            </ul>
        </div>
        <div className="d-flex">   
            <span style={{maxWidth:'200px'}}>{this.state.user ? this.state.user.name : 'No User'}!!!</span>
            <button className="btn btn-info" type="button" onClick={this.onLogout}>Logout</button>
        </div>
    </div>
</nav>
</>);
    ui = uiAdminLoggedIn;
}//End Admin Logged In
else{//Not Logged In
    const uiNotLoggedIn = 
(<>        
<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <a className="navbar-brand" href="/">Carwash App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item"></li>
            </ul>
        </div>
        <div className="d-flex">   
            <span className="nav-item">
                <a className="nav-link active" aria-current="page" href="/customer/login">Login</a>
            </span>
            <span className="nav-item">
                <a className="nav-link" href="/customer/register">Registration</a>
            </span>
            <span className="nav-item">
                <a className="nav-link active" aria-current="page" href="/admin/login">Admin Login</a>
            </span>
        </div>
    </div>
</nav>
</>);
    ui = uiNotLoggedIn;
}//Not Logged In


        return(
            <>{ui}</>
        )
    }
}