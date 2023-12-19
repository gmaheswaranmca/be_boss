import { Component } from 'react'
import CustomerDao  from './CustomerDao'

export default class Header extends Component{
    
    constructor(props){
        super(props)
        this.state = { isLoading: true, isLoggedIn: false, user: null, isLoggedOut: false}        
    }
    componentDidMount(){
        const dao = new CustomerDao()
        const isLoggedIn = dao.isLoggedIn();
        this.setState({isLoggedIn:isLoggedIn, user: dao.getUser()})
    }
    onLogout = (e) => {
        const dao = new CustomerDao()
        dao.doLogout();
        this.setState({isLoggedIn:false, user: null, isLoggedOut: true})
        window.location.reload()
    }
    render(){
       
        return(
            <>  

 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    { 
            this.state.isLoggedIn 
            ?   
            <a class="navbar-brand" href="/appointment/create">Carwash App</a>
            :
            <a class="navbar-brand" href="/">Carwash App</a>
    }
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        {
            this.state.isLoggedIn &&
            <li class="nav-item">
            <a class="nav-link" href="/appointment/create">Appointment</a>
            </li>
        }
      </ul>
    </div>
    <div class="d-flex">    
        { 
            this.state.isLoggedIn 
            ?   <>
                    
                    <span style={{maxWidth:'200px'}}>{this.state.user ? this.state.user.name : 'No User'}!!!</span>
                    
                    <button className="btn btn-info" type="button" onClick={this.onLogout}>Logout</button>
                </>
            :
                <>
                    <span class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/customer/login">Login</a>
                    </span>
                    <span class="nav-item">
                        <a class="nav-link" href="/customer/register">Registration</a>
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