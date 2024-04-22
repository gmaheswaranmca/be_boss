const express = require("express"); 
const cors = require("cors"); 
const Sequelize = require("sequelize");
const dotenv = require("dotenv"); 
const logger = require("./../util/logger"); 

dotenv.config();
//console.log(process.env) // remove this after you've confirmed it is working

const app = express(); 

const { MYSQLDB_HOST,  MYSQLDB_DOCKER_PORT, MYSQLDB_DATABASE, 
    MYSQLDB_USER, MYSQLDB_ROOT_PASSWORD } = process.env; 
    
const db = {
    host: MYSQLDB_HOST,
    port: MYSQLDB_DOCKER_PORT,
    user: MYSQLDB_USER,
    password: MYSQLDB_ROOT_PASSWORD,
    db: MYSQLDB_DATABASE,
    dialect: 'mysql',
    pool_max : 5,
    pool_min : 0,
    pool_acquire: 30000,
    pool_idle: 10000
};
//console.log({db, no:1090})
const { NODE_DOCKER_PORT } = process.env;
const { CLIENT_ORIGIN } = process.env;
const { IS_DEBUG } = process.env;

const app_properties = {
    server_port : NODE_DOCKER_PORT || 8080,
    cors_origin : CLIENT_ORIGIN, /* "http://localhost:3000" */
    db: db,
    IS_DEBUG : ( IS_DEBUG === '1' ),
    imports :  { express, cors, Sequelize, logger },
    instances: { app }
}
//console.log({app_properties})
module.exports = app_properties;