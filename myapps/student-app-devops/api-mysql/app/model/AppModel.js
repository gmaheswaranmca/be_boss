/* 
    Late loading:
    {        
        imports: {Sequelize, logger},
        instances: { sequelize },
        db: db
    }
    !!!db = { ... }
*/
let module_properties = {

};
const setProperties = ( { imports, instances, db } ) => {
    module_properties = { imports, instances, db };
    //console.log(module_properties)
}
class AppModel {   
    sequelize = () => {
        //dependencies
        const { Sequelize } = module_properties.imports;
        //console.log({no:1010, Sequelize})
        const { db } = module_properties;
        //task
        const pool = {
            max: db.pool_max,
            min: db.pool_min,
            acquire: db.pool_acquire,
            idle: db.pool_idle
        };
        const config = {
            host: db.host,
            port: db.port,
            dialect: db.dialect,
            /* operatorsAliases: false, */
            pool: pool
        };
        //console.log({config,db})
        const sequelize = new Sequelize(db.db, db.user, 
            db.password, config);
        return sequelize;
    }
    StudentModel = () => {
        //dependencies
        const { Sequelize } = module_properties.imports;
        const { sequelize } = module_properties.instances;
        //task
        const columns = {
            id: { type: Sequelize.INTEGER, primaryKey: true},
            usn: {type: Sequelize.STRING},
            name: {type: Sequelize.STRING},
            sem: {type: Sequelize.NUMBER},
            branch: {type: Sequelize.STRING},
            cgpa: {type: Sequelize.NUMBER}
        };
        const options = {timestamps: false,   freezeTableName: true    };
        const StudentModel = sequelize.define("student", columns, options);
        return StudentModel;
    }
}

module.exports = { AppModel, AppModule_setProperties: setProperties };