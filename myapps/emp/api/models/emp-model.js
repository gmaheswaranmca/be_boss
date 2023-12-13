const defineEmpModel = (Sequelize, sequelize) => {
    const columns = {
        id: { type: Sequelize.INTEGER},
        name: {type: Sequelize.STRING},
        job_title: {type: Sequelize.STRING},
        dept: {type: Sequelize.STRING},
        business_unit: {type: Sequelize.STRING},
        gender: {type: Sequelize.STRING},
        ethnicity: {type: Sequelize.STRING},
        age: { type: Sequelize.INTEGER} ,
        hire_date: { type: Sequelize.DATE} ,
        salary: { type: Sequelize.FLOAT} ,
        bonus_per: { type: Sequelize.FLOAT} ,
        country: {type: Sequelize.STRING},
        city: {type: Sequelize.STRING},
        exit_date: { type: Sequelize.DATE},
        photo: { type: Sequelize.BLOB}
    };
    const options = {timestamps: false};
    const EmpModel = sequelize.define("emp", columns, options);
    return EmpModel;
};

module.exports = defineEmpModel;