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
    this.sequelize = new Sequelize(appConfig.db.db, appConfig.db.user, appConfig.db.password, config);
  }
  getPersonModel(){
    const definePersonModel = require('./models/person-model');
    const PersonModel = definePersonModel(Sequelize, this.sequelize);
    return PersonModel;
  }
  doDbSync(){
    const handler = () => {
      console.log("Synced db.");
    }
    const errorHandler = (error) => {
      console.log("Failed to sync db: " + error.message);
    }
    
    this.sequelize.sync().then(handler).catch(errorHandler);
  }
}

const appOrm = new AppOrm();
appOrm.doDbSync();
const PersonModel = appOrm.getPersonModel();

module.exports = {PersonModel}