const express = require("express")
const cors = require("cors")
const appConfig = require('./config')

global.__basedir = __dirname;

class EmpApp
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
        const { EmpBulkUploadController } = require('./emp-bulk-upload-controller')
        
        let controller = new EmpBulkUploadController();
        
        this.app.post("/upload-emp-csv", controller.receiveEmpCsvFile);
        this.app.get("/job-title-vs-salary",controller.readJobTitleBasedSalaries)
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
let empApp = new EmpApp(app)
empApp.defineCORS()
empApp.defineREST()
empApp.defineRoutes()
empApp.startApp()

