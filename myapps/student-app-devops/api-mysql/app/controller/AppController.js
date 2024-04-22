/* 
    Late loading:
    {
        server_port, IS_DEBUG,
        imports: { logger }
    }
*/
let module_properties = {

};

const setProperties = ( { imports, properties } ) => {
    module_properties = { imports, ...properties };
}

class AppController{    
    serverInit  = () => {
        //dependencies
        const { server_port } = module_properties;
        //task
        console.log(`Server is running on port ${server_port}`);
    }

    serverRootAction = (request, response) => {
        const rbody = { message: `Welcome To My Application` };
        response.send(rbody);
    }
}

module.exports = {AppController, AppController_setProperties: setProperties };