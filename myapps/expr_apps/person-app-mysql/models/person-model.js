const definePersonModel = (Sequelize, sequelize) => {
    const columns = {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        }
    };
    const options = {timestamps: false};
    const PersonModel = sequelize.define("person", columns, options);
    return PersonModel;
};

module.exports = definePersonModel;