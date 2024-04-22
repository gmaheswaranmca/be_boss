import axios from 'axios'
//'process.env.REACT_APP_API_BASE_URL' is from 'docker' ie build.args 
//  or 
//'hardcoded' if no docker
console.log({'process.env.REACT_APP_API_BASE_URL': process.env.REACT_APP_API_BASE_URL})
const CLIENT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080'
const config = {
    baseURL: CLIENT_API_BASE_URL ,
    headers :{
        'Content-type' : 'application/json'
    }
};
let network = axios.create(config)
export default network;