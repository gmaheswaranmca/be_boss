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
      /* operatorsAliases: false, */
      pool: pool
    };
    this.sequelize = new Sequelize(appConfig.db.db, appConfig.db.user, 
        appConfig.db.password, config);
  }
  getCustomerModel(){
    const defineCustomerModel = require('./models/customer-model');
    const CustomerModel = defineCustomerModel(Sequelize, this.sequelize);
    return CustomerModel;
  }  
  getAppointmentModel(){
    const defineAppointmentModel = require('./models/appointment-model');
    const AppointmentModel = defineAppointmentModel(Sequelize, this.sequelize);
    return AppointmentModel;
  } 
  getAdminModel(){
    const defineAdminModel = require('./models/admin-model');
    const AdminModel = defineAdminModel(Sequelize, this.sequelize);
    return AdminModel;
  } 
}

const appOrm = new AppOrm();
const CustomerModel = appOrm.getCustomerModel();
const AppointmentModel = appOrm.getAppointmentModel();
const AdminModel = appOrm.getAdminModel();


module.exports = {sequelize:appOrm.sequelize, Sequelize,
    CustomerModel, AppointmentModel, AdminModel}