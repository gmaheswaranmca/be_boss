const express = require("express")
const cors = require("cors")
const appConfig = require('./config')
const personAppRoutes = require('./person-routes')

class PersonApp
{
    app = null
    constructor(app){
        this.app = app
    }
    defineCORS(){
        this.app.use(cors({origin: appConfig.frontEnd}))
    }
    defineREST(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }
    defineRoutes(){
        const rootRouteHandler = (request, response) => {
                response.send({"message" : "App Started"})
            }
        this.app.get("/", rootRouteHandler); //URL endpoint:  get   http://localhost:8080/
        personAppRoutes(this.app)            //URL endpoint:  [verb]   http://localhost:8080/person/*
    }
    startApp(){
        const port = appConfig.port;
        const appListener = () => {
            console.log(`Server listens on ${port}, http://localhost:${port}`)
        }
        this.app.listen(port, appListener)
    }
}

module.exports = PersonApp