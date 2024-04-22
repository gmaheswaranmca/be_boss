/* 
    Late loading:
    {
        IS_DEBUG,
        models: {StudentModel},
        imports: { logger }
    }
*/

let module_properties = {

};
const setProperties = ( { imports, models, properties } ) => {
    module_properties = { imports, models, ...properties };
}
const HTTP_STATUS = { 
    OK : 200,
    NOT_FOUND : 404,
    SERVER_ERROR : 500
};


class StudentController {
    create = async (request, response) => {
        //dependencies
        const { StudentModel } = module_properties.models;
        const { logger } = module_properties.imports;
        const { IS_DEBUG } = module_properties;
        //task
        const student = { ...request.body };  

        let rbody = { };
        let rstatus = HTTP_STATUS.OK;

        try {
            const data = await StudentModel.create(student);

            rbody = data;

            if(IS_DEBUG) { 
                console.log({ 'Created Student': rbody }); 
                logger.info(JSON.stringify( { 'Created Student': rbody } ));
            }
        }
        catch( error ) {
            rbody = {message : `Error in creating student.\n${error}`};           

            if(IS_DEBUG) { 
                console.log(rbody);                  
                logger.info( JSON.stringify( rbody ) );
            }

            rstatus = HTTP_STATUS.SERVER_ERROR;
        }

        response.status(rstatus).send(rbody);
    }     
    
    readAll = async (request, response) => {
        //dependencies
        const { StudentModel } = module_properties.models;
        const { logger } = module_properties.imports;
        const { IS_DEBUG } = module_properties;
        //task
        let rbody = {};
        let rstatus = HTTP_STATUS.OK;

        try {
            const data = await StudentModel.findAll();

            rbody = data;
            
            if(IS_DEBUG) { 
                const students = data;
                console.log( { 'Read Students' : students } ); 
                logger.info( JSON.stringify( { 'Read Students' : students } ) );
            } 
        }
        catch( error ) {
            rbody = { message : `Error in reading students.\n${error}` };

            if(IS_DEBUG) { 
                console.log(rbody);                  
                logger.info(JSON.stringify( rbody ));
            }

            rstatus = HTTP_STATUS.SERVER_ERROR;
        }

        response.status(rstatus).send(rbody);  
    }
    
    readById = async (request, response) => {
        //dependencies
        const { StudentModel } = module_properties.models;
        const { IS_DEBUG } = module_properties;
        //task
        const id = request.params.id;

        let rbody = {};
        let rstatus = HTTP_STATUS.OK;

        try {
            const data = await StudentModel.findByPk(id); 

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = HTTP_STATUS.NOT_FOUND;
            }
            else {
                rbody = data;

                if(IS_DEBUG) { console.log("Read Student:", data); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in reading student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = HTTP_STATUS.SERVER_ERROR;
        }

        response.status(rstatus).send(rbody);
    }

    update = async (request, response) => {
        //dependencies
        const { StudentModel } = module_properties.models;
        const { IS_DEBUG } = module_properties;
        //task
        const id = request.params.id;
        const student = {...request.body};

        let rbody = {};
        let rstatus = HTTP_STATUS.OK;

        try {
            const data = await StudentModel.findByPk(id);

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = HTTP_STATUS.NOT_FOUND;
            }
            else {
                let updatedStudent = await StudentModel.update(student, { where:{ id } });
                rbody = updatedStudent;

                if(IS_DEBUG) { console.log("Updated student:", rbody); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in updating student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = HTTP_STATUS.SERVER_ERROR;
        }

        response.status(rstatus).send(rbody);        
    }
    
    remove = async (request, response) => {
        //dependencies
        const { StudentModel } = module_properties.models;
        const { IS_DEBUG } = module_properties;
        //task
        const id = request.params.id;
        
        let rbody = {};
        let rstatus = HTTP_STATUS.OK;

        try {
            const data = await StudentModel.findByPk(id);

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = HTTP_STATUS.NOT_FOUND;
            }
            else {
                await StudentModel.destroy( { where: { id } });     

                rbody = {message: "Student is Deleted successfully."};
            
                if(IS_DEBUG) { console.log(rbody); }            
            }
        }
        catch( error ) {
            rbody = {message : `Error in deleting student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = HTTP_STATUS.SERVER_ERROR;
        }

        response.status(rstatus).send(rbody);
    }  
}

module.exports = { StudentController, StudentController_setProperties : setProperties };