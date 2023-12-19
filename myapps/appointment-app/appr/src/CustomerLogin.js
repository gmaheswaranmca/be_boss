import { Component } from 'react'
import CustomerDao  from './CustomerDao'
import { withRouter} from './withRouter'
import LoadingPage from './LoadingPage'

class CustomerLoginNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = { mobile: '', password: '', isLoggedIn: false, isLoading: true}
    }
    onBoxChange = (e) => {
        let entity = {}
        entity[e.target.id] = e.target.value;
        this.setState(entity)
    }
    onLogin = async(e) => {
        const dao = new CustomerDao();
        try{
            let loginData = {
                mobile: this.state.mobile,
                password: this.state.password
            }
            let loginResponse = await dao.login(loginData);
            loginResponse = loginResponse.data
            console.log(loginResponse) //XXXXX
            if(loginResponse.isValidLogin){
                dao.setUser(loginResponse.user);
                this.setState({isLoggedIn : true})               
                alert(loginResponse.message)
                this.props.router.navigate("/appointment/create");
                window.location.reload();                   
            }else{
                alert(loginResponse.message)
            }            
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
            return
        }
        this.setState({isLoading: false})

    }
    render(){      
        return(
                this.state.isLoading 
                ?
            <LoadingPage/>
            :
            <>  
               <div className="container">
                    <form>    
                        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                       
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
                        
                        <button class="w-100 btn btn-lg btn-primary"
                            type="button"
                            onClick={this.onLogin}>Sign in</button>
                    </form>
                </div>                
            </>         
        )
    }
}

const CustomerLogin = withRouter(CustomerLoginNoRouter)
export default CustomerLogin 