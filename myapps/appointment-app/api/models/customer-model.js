const defineCustomerModel = (Sequelize, sequelize) => {
    const columns = {
        id: { type: Sequelize.INTEGER, primaryKey: true},
        name: {type: Sequelize.STRING},
        mobile: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING},
        location: {type: Sequelize.STRING}
    };
    const options = {timestamps: false,   freezeTableName: true    };
    const CustomerModel = sequelize.define("customer", columns, options);
    return CustomerModel;
};

module.exports = defineCustomerModel;