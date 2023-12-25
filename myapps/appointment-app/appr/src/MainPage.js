import { Component } from 'react'
import CustomerDao, { SecurityDao }  from './CustomerDao'
import { Navigate } from 'react-router-dom'
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
		let pageData = {
			...this.state.pageData, 
			isLoggedIn:isLoggedIn, 
			user: dao.getUser()
		};
        this.setState({pageData:pageData})
        if(!isLoggedIn){
            this.props.router.navigate("/customer/login");//LOG IN PAGE
            window.location.reload();  
            return
        }
		
		if(isLoggedIn){
            this.props.router.navigate("/appointment/create");//LOGGED IN PAGE
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
        if(this.state.isLoading){
            return(
                <LoadingPage/>
            )
        }

        return(
            <></>
        )
    }
}

const MainPage = withRouter(MainPageNoRouter)
export default MainPage 