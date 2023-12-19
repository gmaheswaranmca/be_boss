import { Component } from 'react'
import CustomerDao  from './CustomerDao'
import { withRouter} from './withRouter'

class CustomerRegistrationNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = {name: '', mobile: '', password: '', location: ''}
    }
    onBoxChange = (e) => {
        let entity = {}
        entity[e.target.id] = e.target.value;
        this.setState(entity)
    }
    onRegister = async(e) => {
        const dao = new CustomerDao();
        try{
            const savedCustomer = await dao.register({...this.state});
            console.log(savedCustomer) //XXXXX
            
            this.props.router.navigate("/customer/login");
            window.location.reload();  
        
            alert('Customer has been registered successfully')
        }catch(error){
            console.log(error)   //XXXXX
            alert('Server Error')
        }
    }
    componentDidMount(){
        const dao = new CustomerDao()
        const isLoggedIn = dao.isLoggedIn();        
        if(isLoggedIn){
            this.props.router.navigate("/appointment/create");
            window.location.reload();  
        }
    }
    render(){
        return(
            <>  
               <div className="container">
                    <form>    
                        <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
                        <div class="form-floating">
                            <input type="text" 
                                	className="form-control" 
                                    id="name" 
                                    placeholder="Your Name"
                                    value={this.state.name}
                                    onChange={this.onBoxChange}
                                    />
                            <label forName="name">Name</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="mobile" 
                                placeholder="Mobile Number"
                                value={this.state.mobile}
                                onChange={this.onBoxChange}/>
                            <label forName="mobile">Mobile Number</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" 
                                class="form-control" 
                                id="password" 
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onBoxChange}/>
                            <label for="password">Password</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="location" 
                                placeholder="Location"                                
                                value={this.state.location}
                                onChange={this.onBoxChange}/>
                            <label forName="name">Location</label>
                        </div>
                        <button class="w-100 btn btn-lg btn-primary"
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