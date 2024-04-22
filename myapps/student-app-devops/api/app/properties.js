const express = require("express"); 
const cors = require("cors"); 
const mongoose = require("mongoose"); 
const dotenv = require("dotenv"); 
const mongoosePaginate = require("mongoose-paginate-v2"); //XXX NOT INSTALLED $npm install mongoose-paginate-v2
const logger = require("./../util/logger"); 

dotenv.config();
console.log(process.env) // remove this after you've confirmed it is working

const app = express(); 
const { MONGODB_HOST,  MONGODB_DOCKER_PORT, MONGODB_DATABASE } = process.env; /* DB_USER, DB_PASSWORD, */
const { NODE_DOCKER_PORT } = process.env;
const { CLIENT_ORIGIN } = process.env;
const { IS_DEBUG } = process.env;

const app_properties = {
    server_port : NODE_DOCKER_PORT || 8080,
    cors_origin : CLIENT_ORIGIN, /* "http://localhost:3000" */
    mongo_url: `mongodb://${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}`, /* `mongodb://mydb:7017/nithin_db` */
    IS_DEBUG : ( IS_DEBUG === '1' ),
    imports :  { express, cors, mongoose, logger, mongoosePaginate},
    instances: { app }
}
console.log({app_properties})
module.exports = app_properties;

/*
mongo_url: "mongodb://mydb:7017/nithin_db"
mongo_url: "mongodb://root:4321@mydb:7017/nithin_db?authSource=admin"

cors_origin : "http://localhost:3000"

*/