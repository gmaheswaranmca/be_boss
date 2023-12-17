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

        const { CustomerController } = require('./customer-controller')        
        let customerController = new CustomerController();        
        this.app.post("/customer/register", customerController.register); // R 01
        this.app.post("/customer/login", customerController.login); // R 02
        this.app.post("/appointment", [customerController.tokenVerify], 
            customerController.fixAppointment); // R 02
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