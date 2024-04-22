/* 
    Late loading:
    {
        IS_DEBUG,
        models: {StudentModel},
        imports: { logger, mongoosePaginate }
    }
*/

let module_properties = {

};
const setProperties = ( { imports, models, properties } ) => {
    module_properties = { imports, models, ...properties };
}

class PaginatedStudentController {
    getPagination = (page, size) => {
        const limit = ( size ? ( +size ) : 3 );
        const offset = ( page ? ( page * limit ) : 0 );
      
        return { limit, offset };
    }
     readAll = async (request, response) => {
        //dependencies
        const { StudentModel } = module_properties.models;
        const { logger, mongoosePaginate } = module_properties.imports;
        const { IS_DEBUG } = module_properties;
        //task
        const { limit, offset } = this.getPagination(page, size);
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
}

module.exports = { PaginatedStudentController, PaginatedStudentController_setProperties : setProperties };