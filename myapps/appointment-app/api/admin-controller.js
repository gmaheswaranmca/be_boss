const { AdminModel, AppointmentModel, sequelize} = require('./models');
const appConfig = require('./config');

const { QueryTypes } = require('sequelize');
const md5= require('md5');
const jwt = require("jsonwebtoken");

class AdminController{
      login = async(request, response) => {
/*
POST http://localhost:8080/admin/login
    {
        "username": "mahesh",
        "password": "1234"
    }
*/    
        let responseCode = 200;
        let responseBody = {};
        let isValidLogin = true;

        const inputLogin = {...request.body};
        console.log(inputLogin);

        const oldAdmin = await AdminModel.findOne(
            {
                where:
                    {
                        username: inputLogin.username
                    }
            });
        if(!oldAdmin){
            isValidLogin = false;
            responseCode = 200;
            responseBody = {isValidLogin: isValidLogin, message: 'Invalid username / password'}
        }

        if(oldAdmin.password !== md5(inputLogin.password)){
            isValidLogin = false;
            responseCode = 200;
            responseBody = {isValidLogin: isValidLogin, message: 'Invalid username / password'}
        }

        if(isValidLogin){
            const token = jwt.sign(
                { loginname : inputLogin.username, role: 'admin' },
                appConfig.jwtSecret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: appConfig.jwtExpires
                }
            );

            const userData = {token: token, 
                username: inputLogin.username, 
                name: oldAdmin.username,
                app: 'admin',
                role: 'manager',
                admin_id: oldAdmin.id}
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

   confirmAppointment = async(request, response) => {
/*
POST http://localhost:8080/appointment/confirm
    {
        "id": 5,
        "status" : 2,
        "staff" : "DRAVID"
    }
    header : {'x-access-token' : token}
*/ 
        let responseCode = 200;
        let responseBody = {isLoggedIn: true};

        let loginData = request.loginData;
        let id = request.body.id;

        let appointment = await AppointmentModel.findByPk(id);

        if(!appointment){
            responseCode = 500;
            responseBody = {isLoggedIn: false, message: 'Unauthorized Access'}
        }
		
		if(responseBody.isLoggedIn){
			const updateAppointment = { 
				status : request.body.status,
				staff: request.body.staff
				};
			console.log(updateAppointment);
			const savedAppointment = await AppointmentModel.update(updateAppointment, {where:{id: id}})

			responseBody = {isLoggedIn: true, savedAppointment: savedAppointment}
		}

        response.status(responseCode).send(responseBody)
   } 
   
   cancelAppointment = async(request, response) => {
/*
POST http://localhost:8080/appointment/cancel
    {
        "id": 5,
        "status" : 3,
        "cancel_reason" : "ALL STAFF BUSY"
    }
    header : {'x-access-token' : token}
*/ 
        let responseCode = 200;
        let responseBody = {isLoggedIn: true};

        let loginData = request.loginData;
        let id = request.body.id;

        let appointment = await AppointmentModel.findByPk(id);

        if(!appointment){
            responseCode = 500;
            responseBody = {isLoggedIn: false, message: 'Unauthorized Access'}
        }
		
		if(responseBody.isLoggedIn){
			const updateAppointment = { 
				status : request.body.status,
				cancel_reason: request.body.cancel_reason
				};
			console.log(updateAppointment);
			const savedAppointment = await AppointmentModel.update(updateAppointment, {where:{id: id}})

			responseBody = {isLoggedIn: true, savedAppointment: savedAppointment}
		}
		
        response.status(responseCode).send(responseBody)
   } 
   
   viewAppointments = async(request, response) => {
/*
GET http://localhost:8080/appointment/view    
    header : {'x-access-token' : token}
*/ 
        let responseCode = 200;
        let responseBody = {isLoggedIn: true};

        let loginData = request.loginData;
        
		let sqlAptmt = `SELECT appointment.id, entry_time, customer_id, 
car_name, model, appointment_date, service_type, 
staff, cancel_reason, status,
customer.name as customer_name, customer.mobile, customer.location 
FROM appointment 
	INNER JOIN customer ON(appointment.customer_id = customer.id)`;
	
		const sqlAppointments = sqlAptmt + ' WHERE (status = 1)'

        let appointments = await sequelize.query(sqlAppointments, { type: QueryTypes.SELECT });

        responseBody = {isLoggedIn: true, appointments: appointments}

        response.status(responseCode).send(responseBody)
   } 
   
   historyOfAppointments = async(request, response) => {
/*
GET http://localhost:8080/appointment/history/2    
    header : {'x-access-token' : token}
*/ 
        let responseCode = 200;
        let responseBody = {isLoggedIn: true};

        let loginData = request.loginData;
		let historyType = request.params.historyType
        
		let sqlAptmt = `SELECT appointment.id, entry_time, customer_id, 
car_name, model, appointment_date, service_type, 
staff, cancel_reason, status,
customer.name as customer_name, customer.mobile, customer.location 
FROM appointment 
	INNER JOIN customer ON(appointment.customer_id = customer.id)`;
	
		const sqlHistory = sqlAptmt + ` WHERE status IN(2,3) `
		
		const sqlHistoryByType = sqlHistory + ` AND ((status = ${historyType}) OR (${historyType} = 4))`

        let appointments = await sequelize.query(sqlHistoryByType, { type: QueryTypes.SELECT });

        responseBody = {isLoggedIn: true, appointments: appointments}

        response.status(responseCode).send(responseBody)
   }   
}

module.exports = { AdminController }