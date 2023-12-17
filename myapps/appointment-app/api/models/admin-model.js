const defineAdminModel = (Sequelize, sequelize) => {
    const columns = {
        id: { type: Sequelize.INTEGER, primaryKey: true},
        username: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING}
    };
    const options = {timestamps: false,   freezeTableName: true    };
    const AdminModel = sequelize.define("admin", columns, options);
    return AdminModel;
};

module.exports = defineAdminModel;