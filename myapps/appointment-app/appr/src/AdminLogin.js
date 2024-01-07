import { Component } from 'react'
import { AdminDao, SecurityDao }  from './CustomerDao'
import { withRouter} from './withRouter'
import LoadingPage from './LoadingPage'
import Header from './Header';

class AdminLoginNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = { 
            loginFormData   :   {   username: '', password: ''    }, 
            pageData        :   {   isLoggedIn: false, isLoading: true  } 
        };
    }
    componentDidMount(){
        const securityDao = new SecurityDao()
        const isLoggedIn = securityDao.isLoggedIn();  
          
        if(isLoggedIn){
            this.props.router.navigate("/");//MAIN PAGE
            //window.location.reload();  
            return
        }
        
        this.setState({ pageData: { ...this.state.pageData, isLoading: false }    })
    }
    onBoxChange = (e) => {
        let loginFormData = {...this.state.loginFormData};
        loginFormData[e.target.id] = e.target.value;
        this.setState({loginFormData: loginFormData});
    }
    onLogin = async(e) => {
        const adminDao = new AdminDao();
        const securityDao = new SecurityDao();
        try{
            let loginFormData = {
                ...this.state.loginFormData
            }
            let loginResponse = await adminDao.login(loginFormData);
            loginResponse = loginResponse.data
            console.log(loginResponse) //XXXXX
            if(loginResponse.isValidLogin){
                securityDao.setUser(loginResponse.user);
                this.setState({ pageData: { ...this.state.pageData, isLoggedIn: true }    });               
                //alert(loginResponse.message);

                this.props.router.navigate("/");//MAIN PAGE
				//window.location.reload();  
				return                   
            }
                
			alert(loginResponse.message)                     
        }catch(error){
            console.log(error)   //XXXXX
            alert('Server Error')
        }
    }
    
    render(){      
        if(this.state.pageData.isLoading){
            return(
                <LoadingPage router={this.props.router}/>
            )
        }


        return(
            <>  
                <Header router={this.props.router}/>
               <div className="container">
                    <form>    
                        <h1 className="h3 mb-3 fw-normal">Admin Sign In</h1>
                       
                        <div className="form-floating">
                            <input type="text" 
                                className="form-control" 
                                id="username" 
                                placeholder="Username"
                                value={this.state.loginFormData.username}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                value={this.state.loginFormData.password}
                                onChange={this.onBoxChange}/>
                            <label htmlFor="password">Password</label>
                        </div>
                        
                        <button className="w-100 btn btn-lg btn-primary"
                            type="button"
                            onClick={this.onLogin}>Sign in</button>
                    </form>
                </div>                
            </>         
        )
    }
}

const AdminLogin = withRouter(AdminLoginNoRouter)
export default AdminLogin 