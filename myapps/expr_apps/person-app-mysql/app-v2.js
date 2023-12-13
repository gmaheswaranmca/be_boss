const express = require("express")
const app = express()
const PersonApp  = require('./app-start')
const personApp = new PersonApp(app)

personApp.defineCORS()
personApp.defineREST()
personApp.defineRoutes()
personApp.startApp()