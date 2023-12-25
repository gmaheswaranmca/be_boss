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
        window.location.reload()
    }
    render(){
       
        return(
            <>  

 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    { 
            this.state.isLoggedIn 
            ?   
            <a className="navbar-brand" href="/appointment/create">Carwash App</a>
            :
            <a className="navbar-brand" href="/">Carwash App</a>
    }
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {
            this.state.isLoggedIn &&
            <li className="nav-item">
            <a className="nav-link" href="/appointment/create">Appointment</a>
            </li>
        }
      </ul>
    </div>
    <div className="d-flex">    
        { 
            this.state.isLoggedIn 
            ?   <>
                    
                    <span style={{maxWidth:'200px'}}>{this.state.user ? this.state.user.name : 'No User'}!!!</span>
                    
                    <button className="btn btn-info" type="button" onClick={this.onLogout}>Logout</button>
                </>
            :
                <>
                    <span className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/customer/login">Login</a>
                    </span>
                    <span className="nav-item">
                        <a className="nav-link" href="/customer/register">Registration</a>
                    </span>
                </>
        }
    </div>
  </div>
</nav>
            </>
        )
    }
}