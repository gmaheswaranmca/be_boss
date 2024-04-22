/* 
    Late loading:
    {
        server_port, IS_DEBUG, mongo_url,
        imports: { mongoose, logger }
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

    connectToMongo = async () => {
        //dependencies
        const { IS_DEBUG, mongo_url } = module_properties;
        const { mongoose } = module_properties.imports;
        //task
        mongoose.Promise = global.Promise;
        if(IS_DEBUG) { console.log( { dbUrl: mongo_url } ); }
        try {
            //const mongoose_config = {useNewUrlParser: true,useUnifiedTopology: true};
            //await mongoose.connect(mongo_url, mongoose_config);
            await mongoose.connect(mongo_url);

            if(IS_DEBUG) { console.log("Connected to database");  }
        }
        catch( error ) {
            if(IS_DEBUG) { console.log("Cannot connect to database", error); }
            process.exit();
        }
    }
}

module.exports = {AppController, AppController_setProperties: setProperties };