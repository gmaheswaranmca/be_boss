import { Component } from 'react'
import { SecurityDao }  from './CustomerDao'
import { withRouter} from './withRouter'
import LoadingPage from './LoadingPage'


class MainPageNoRouter extends Component{
    constructor(props){
        super(props)
        this.state = {
			pageData :   {isLoggedIn: true, user: null, isLoading: true}
		};
    }
    componentDidMount(){
        const dao = new SecurityDao()
        const isLoggedIn = dao.isLoggedIn();
        const user = dao.getUser()
		let pageData = {
			...this.state.pageData, 
			isLoggedIn:isLoggedIn, 
			user: user
		};
        this.setState({pageData:pageData})
        if(!isLoggedIn){
            this.props.router.navigate("/customer/login");//LOG IN PAGE
            window.location.reload();  
            return
        }
		
		if(isLoggedIn && user.app === 'customer'){
            this.props.router.navigate("/appointment/create");//LOGGED IN PAGE, Customer App
            window.location.reload();  
            return
        }	
        
        if(isLoggedIn && user.app === 'admin'){
            this.props.router.navigate("/appointment/view");//LOGGED IN PAGE, Admin App
            window.location.reload();  
            return
        }
		
		pageData = { 
			...this.state.pageData, 
			isLoading: false 
		};
        this.setState({ pageData: pageData})
    }
    render(){
        if(this.state.pageData.isLoading){
            return(
                <>
                    <LoadingPage router={this.props.router}/>
                </>
            )
        }

        return(
            <></>
        )
    }
}

const MainPage = withRouter(MainPageNoRouter)
export default MainPage 