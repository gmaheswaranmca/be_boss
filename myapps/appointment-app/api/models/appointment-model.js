const defineAppointmentModel = (Sequelize, sequelize) => {
    const columns = {
        id: { type: Sequelize.INTEGER, primaryKey: true},
        entry_time: {type: Sequelize.DATE},
        customer_id: {type: Sequelize.INTEGER},
        car_name: {type: Sequelize.STRING},
        model: {type: Sequelize.STRING},
        appointment_date: {type: Sequelize.DATE},
        service_type: {type: Sequelize.STRING},
        staff: {type: Sequelize.STRING},
        cancel_reason: {type: Sequelize.STRING},
        status: {type: Sequelize.INTEGER}
    };
    const options = {timestamps: false,   freezeTableName: true    };
    const AppointmentModel = sequelize.define("appointment", columns, options);
    return AppointmentModel;
};

module.exports = defineAppointmentModel;