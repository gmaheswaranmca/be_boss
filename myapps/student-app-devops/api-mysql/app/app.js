'use strict';
/*
version: 4.0
*/ 
const app_properties = require('./properties'); 

//...
const { AppModel, AppModule_setProperties } = require('./model/AppModel');
AppModule_setProperties({
    imports: { 
        Sequelize: app_properties.imports.Sequelize, 
        logger: app_properties.imports.logger
    },
    db: app_properties.db
}); 
const appModel = new AppModel(); 
    app_properties["instances"]["appModel"] = appModel;// app_properties.instances.+appModel

app_properties["instances"]["sequelize"] = appModel.sequelize();
AppModule_setProperties({
    imports: { 
        Sequelize: app_properties.imports.Sequelize, 
        logger: app_properties.imports.logger
    },
    db: app_properties.db,
    instances: { sequelize: app_properties.instances.sequelize }
}); 
const StudentModel = appModel.StudentModel(); 
    app_properties["models"] = { StudentModel };
//...
const { AppController, AppController_setProperties }  = require('./controller/AppController'); 
AppController_setProperties( {
    imports: { logger: app_properties.imports.logger },
    properties: { 
        server_port: app_properties.server_port ,             
        IS_DEBUG: app_properties.IS_DEBUG, 
        mongo_url: app_properties.mongo_url }
    } );
//...
const appController = new AppController(); 
    app_properties["instances"]["appController"] = appController;// app_properties.instances.+appController
//...
const {StudentController, StudentController_setProperties} = require('./controller/StudentController'); 
StudentController_setProperties({
    models:{ StudentModel }, 
    imports: { logger: app_properties.imports.logger },
    properties: { IS_DEBUG: app_properties.IS_DEBUG }
    });

//...
const {AppRoutes, AppRoutes_setProperties} = require('./AppRoutes'); 
AppRoutes_setProperties( {
    imports: { logger: app_properties.imports.logger },
    instances: { app: app_properties.instances.app }
    } );

function app_init(){
    //depedencies
    const { cors_origin } = app_properties;
    const { express, cors, logger } = app_properties.imports;
    const { app } = app_properties.instances;
    //task
    console.log("Frontend Site(CORS):", cors_origin);
    logger.info(`Frontend Site(CORS): ${cors_origin}`);
    // I - middleware calls
        // 1. third-party middleware 
        //      - Enable cross-origin resource sharing (CORS) with various options
        //      - Here, 'cross-origin' means 'cross-site'
        //      -       'cross-origin resource sharing' means 'cross-site resource request and response'
        app.use( cors( cors_origin ) ); 

        // 2. built-in middleware
        //      - parses incoming requests with JSON payloads. 
        //        NOTE: Available with Express 4.16.0+
        app.use( express.json() );                        

        // 3. built-in middleware
        //      - parses incoming requests with URL-encoded payloads. 
        //        NOTE: Available with Express 4.16.0+
        app.use( express.urlencoded( { extended: true } ) );  

    // II - Routes for API end points
        const appRoutes = new AppRoutes();
        appRoutes.root(appController);
        appRoutes.students(new StudentController());
}
app_init();

module.exports = app_properties;
   