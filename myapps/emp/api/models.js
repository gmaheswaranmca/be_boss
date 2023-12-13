// 2 - models (database tables mapper) processor 
const Sequelize = require("sequelize");
const appConfig = require("./config")

class AppOrm{
  sequelize = null
  constructor(){
    this.init();
  }
  init(){
    const pool = {
      max: appConfig.db.pool_max,
      min: appConfig.db.pool_min,
      acquire: appConfig.db.pool_acquire,
      idle: appConfig.db.pool_idle
    };
    const config = {
      host: appConfig.db.host,
      port: appConfig.db.port,
      dialect: appConfig.db.dialect,
      operatorsAliases: false,
      pool: pool
    };
    this.sequelize = new Sequelize(appConfig.db.db, appConfig.db.user, 
        appConfig.db.password, config);
  }
  getEmpModel(){
    const defineEmpModel = require('./models/emp-model');
    const EmpModel = defineEmpModel(Sequelize, this.sequelize);
    return EmpModel;
  }  
}

const appOrm = new AppOrm();
const EmpModel = appOrm.getEmpModel();

module.exports = {EmpModel}