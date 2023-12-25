import { Component } from 'react'
import CustomerDao, { SecurityDao }  from './CustomerDao'
import { withRouter} from './withRouter'
import LoadingPage from './LoadingPage'

class CustomerRegistrationNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = {
            registrationFormData    : { name: '', mobile: '', password: '', location: '' }, 
            pageData                : {   isLoading: true   }
        };
    }
	componentDidMount(){
        const securityDao = new SecurityDao()
        const isLoggedIn = securityDao.isLoggedIn();        
        if(isLoggedIn){
            this.props.router.navigate("/");//MAIN PAGE
            window.location.reload();  
            return
        }
        
        this.setState({ pageData: { ...this.state.pageData, isLoading: false }    })
    }
    onBoxChange = (e) => {
        let registrationFormData = {...this.state.registrationFormData};
        registrationFormData[e.target.id] = e.target.value;
        this.setState({registrationFormData: registrationFormData});
    }
    onRegister = async(e) => {
        const dao = new CustomerDao();
        try{
			let registrationFormData = {
                ...this.state.registrationFormData
            }
            const savedCustomer = await dao.register(registrationFormData);
            console.log(savedCustomer) //XXXXX
            
            this.props.router.navigate("/customer/login");
            window.location.reload();  
        
            alert('Customer has been registered successfully')
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
                        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
                        <div className="form-floating">
                            <input type="text" 
                                	className="form-control" 
                                    id="name" 
                                    placeholder="Your Name"
                                    value={this.state.registrationFormData.name}
                                    onChange={this.onBoxChange}
                                    />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="mobile" 
                                placeholder="Mobile Number"
                                value={this.state.registrationFormData.mobile}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="mobile">Mobile Number</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                value={this.state.registrationFormData.password}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="location" 
                                placeholder="Location"                                
                                value={this.state.registrationFormData.location}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="name">Location</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary"
                            type="button"
                            onClick={this.onRegister}>Sign up</button>
                    </form>
                </div>                
            </>
        )
    }
}

const CustomerRegistration = withRouter(CustomerRegistrationNoRouter)
export default CustomerRegistration 