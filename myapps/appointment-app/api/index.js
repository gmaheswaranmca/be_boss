const express = require("express")
const cors = require("cors")
const appConfig = require('./config')

class CarWashApp
{
    app = null
    constructor(app){
        this.app = app
    }
    defineCORS = ()=>{
        this.app.use(cors({origin: appConfig.frontEnd}))
    }
    defineREST = ()=>{
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }
    defineRoutes = ()=>{
        const rootRouteHandler = (request, response) => {
                response.send({"message" : "App Started"})
            };

        this.app.get("/", rootRouteHandler); //URL endpoint:  get   http://localhost:8080/

        const { CustomerController } = require('./customer-controller');        
        let customerController = new CustomerController();        
        this.app.post("/customer/register", customerController.register); // R 01A
        this.app.post("/customer/login", customerController.login); // R 02A
        this.app.post("/appointment", 
			[customerController.tokenVerify], 
            customerController.fixAppointment); // R 03A 
												// Tot R = 1 + 3 = 4
			
			
		const { AdminController } = require('./admin-controller');  		
        let adminController = new AdminController();        
        this.app.post("/admin/login", adminController.login); // R 01B
        this.app.get("/appointment/view", 
			[adminController.tokenVerify], 
			adminController.viewAppointments); // R 02B
		this.app.post("/appointment/confirm", 
			[adminController.tokenVerify], 
			adminController.confirmAppointment); // R 03B
		this.app.post("/appointment/cancel", 
			[adminController.tokenVerify], 
			adminController.cancelAppointment); // R 04B
        this.app.get("/appointment/history/:historyType", 
			[adminController.tokenVerify], 
            adminController.historyOfAppointments); // R 05B
													// Tot R = 4 + 5 = 9
    }
    startApp=()=>{
        const port = appConfig.port;
        const appListener = () => {
            console.log(`Server listens on ${port}, http://localhost:${port}`)
        }
        this.app.listen(port, appListener)
    }
}

const app = express()
let carWashApp = new CarWashApp(app)
carWashApp.defineCORS()
carWashApp.defineREST()
carWashApp.defineRoutes()
carWashApp.startApp()