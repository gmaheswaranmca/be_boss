const { CustomerModel, AppointmentModel} = require('./models')
const appConfig = require('./config')
const md5= require('md5')
const jwt = require("jsonwebtoken");
class CustomerController{
   register = async(request, response) => {
/*
POST http://localhost:8080/customer/register
    {
        "name": "narmada",
        "mobile": "9991",
        "password": "4321",
        "location": "Srirampura"
    }
*/
        let responseCode = 200;
        let responseBody = {};
        
        const inputCustomer = {...request.body, password: md5(request.body.password)};
        console.log(inputCustomer);
        
        try{
            const savedCustomer = await CustomerModel.create(inputCustomer);
            responseBody = savedCustomer;
            console.log(savedCustomer)
        }catch(error){
            console.log(error)
            responseBody = error;
            responseCode = 500;
        }    

        response.status(responseCode).send(responseBody)
   }
   login = async(request, response) => {
/*
POST http://localhost:8080/customer/login
    {
        "mobile": "9991",
        "password": "4321"
    }
*/    
        let responseCode = 200;
        let responseBody = {};
        let isValidLogin = true;

        const inputLogin = {...request.body};
        console.log(inputLogin);

        const oldCustomer = await CustomerModel.findOne(
            {
                where:
                    {
                        mobile: inputLogin.mobile
                    }
            });
		//console.log(oldCustomer, oldCustomer===null, oldCustomer==null)
        if(!oldCustomer){
            isValidLogin = false;
            responseCode = 200;
            responseBody = {isValidLogin: isValidLogin, message: 'Invalid username / password 1'}
        }

        if(oldCustomer && oldCustomer.password !== md5(inputLogin.password)){
            isValidLogin = false;
            responseCode = 200;
            responseBody = {isValidLogin: isValidLogin, message: 'Invalid username / password 2'}
        }

        if(isValidLogin){
            const token = jwt.sign(
                { loginname : inputLogin.mobile, app: 'customer' },
                appConfig.jwtSecret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: appConfig.jwtExpires
                }
            );

            const userData = {token: token, 
                username: inputLogin.mobile, 
                name: oldCustomer.name,
                app: 'customer',
                role: 'customer',
                customer_id: oldCustomer.id}
            responseCode = 200;
            responseBody = {isValidLogin: true, message: 'Successful Login', user: userData}
        }        
        response.status(responseCode).send(responseBody)
   }

   tokenVerify = (request, response, next)=>{
        let responseCode = 200;
        let responseBody = {};

        let token = request.headers["x-access-token"];

        if(!token){
            responseCode = 401;
            responseBody = {isLoggedIn: false, message: 'Unauthorized Access'};

            response.status(responseCode).send(responseBody);
        }

        jwt.verify(token,
            appConfig.jwtSecret,
            (err, decoded) => {
                if (err) {
                    console.log('unauthorized') // XXXXX
                    responseCode = 401;
                    responseBody = {isLoggedIn: false, message: 'Login Expired'};
                    response.status(responseCode).send(responseBody);
                    return
                }
              
                console.log('authorized', decoded) // XXXXX
                request.loginData = {loginname: decoded.loginname, role: decoded.role}
                next()
            });
   }	

   fixAppointment = async(request, response) => {
/*
POST http://localhost:8080/appointment
    {
        "car_name": "Volks Wagon",
        "model" :"Taigun",
        "appointment_date" : "2023-12-18",
        "service_type" : "Both"
    }
    header : {'x-access-token' : token}
*/ 
        let responseCode = 200;
        let responseBody = {};

        let loginData = request.loginData;
        let mobile = loginData.loginname;

        let customer = await CustomerModel.findOne(
            {
                where:
                    {
                        mobile: mobile
                    }
            }
        );

        if(!customer){
            responseCode = 500;
            responseBody = {isLoggedIn: false, message: 'Unauthorized Access'}
        }

        const inputAppointment = {...request.body, customer_id: customer.id};
        console.log(inputAppointment);
        const createdAppointment = await AppointmentModel.create(inputAppointment)

        responseBody = {isLoggedIn: true, savedAppointment: createdAppointment}

        response.status(responseCode).send(responseBody)
   } 
}

module.exports = { CustomerController }