import network from "./Network";
export default class CustomerDao{
    register = (newCustomer) => {
        return network.post('/customer/register', newCustomer);
    }
    login = (newLogin) => {
        return network.post('/customer/login', newLogin);
    }
    fixAppointment = (newAppointment, token) => {
        const headers = {
            'x-access-token' : token
        };
        return network.post('/appointment', newAppointment, {headers: headers});
    }
    getUser = () => {
        const user = localStorage.getItem('user')
        return JSON.parse(user)
    }
    setUser = (user) => {
        alert(user.name)
        localStorage.setItem('user', JSON.stringify(user))
    }
    doLogout = () => {
        localStorage.removeItem('user')
    }
    isLoggedIn = () => {
        if(!this.getUser())
        {
            return false            
        }else{
            return true 
        } 
    }

}