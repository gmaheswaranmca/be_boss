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

class StudentController {
    create = async (request, response) => {
        //dependencies
        const { StudentModel } = module_properties.models;
        const { logger } = module_properties.imports;
        const { IS_DEBUG } = module_properties;
        //task
        const student = { ...request.body };  

        let rbody = { };
        let rstatus = 200;

        try {
            const data = await StudentModel.create(student);

            rbody = data;

            if(IS_DEBUG) { 
                console.log({ 'Created Student': rbody.toObject() }); 
                logger.info(JSON.stringify( { 'Created Student': rbody.toObject() } ));
            }
        }
        catch( error ) {
            rbody = {message : `Error in creating student.\n${error}`};           

            if(IS_DEBUG) { 
                console.log(rbody);                  
                logger.info( JSON.stringify( rbody ) );
            }

            rstatus = 500;
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
        let rstatus = 200;

        try {
            const data = await StudentModel.find();

            rbody = data;
            
            if(IS_DEBUG) { 
                const students = rbody.map(student => student.toObject());
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

            rstatus = 500;
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
        let rstatus = 200;

        try {
            const data = await StudentModel.findOne({ _id : id }); 

            //const data = await StudentModel.findById(id);

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = 404;
            }
            else {
                rbody = data;

                if(IS_DEBUG) { console.log("Read Student:", data.toObject()); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in reading student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
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
        let rstatus = 200;

        try {
            const data = await StudentModel.findOneAndUpdate({ _id : id }, student, {new: true});
            //const data = await StudentModel.findByIdAndUpdate(id, student, {new: true})

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = 404;
            }
            else {
                rbody = data;

                if(IS_DEBUG) { console.log("Updated student:", data.toObject()); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in updating student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
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
        let rstatus = 200;

        try {
            const data = await StudentModel.findOneAndDelete({ _id : id });
            //const data = await StudentModel.findByIdAndDelete(id);

            if(!data) {
                rbody = {"message" : "Student is not found"};

                if(IS_DEBUG) { console.log(rbody); }

                rstatus = 404;
            } 
            else { 
                rbody = {message: "Student is Deleted successfully."};

                if(IS_DEBUG) { console.log(rbody); }
            }
        }
        catch( error ) {
            rbody = {message : `Error in deleting student.\n${error}`};

            if(IS_DEBUG) { console.log(rbody); }

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }  
}

module.exports = { StudentController, StudentController_setProperties : setProperties };