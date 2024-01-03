const { CustomerModel, AppointmentModel } = require('./models')
const md5 = require('md5')

newCustomer = {
        name: 'neela',
        mobile: '9999',
        password: md5('4321'),
        location: 'Banni Manta'
    };

newAppointment = {
        customer_id: 1,
        car_name: 'Volks Wagen',
        model: 'Taigun',
        appointment_date: '2023-12-18',
        service_type: 'INTERIOR'
    };    

const test = async () => {
    const savedCustomer = await CustomerModel.create(newCustomer);
    console.log('Customer has created successfully', savedCustomer);

    const oldCustomers = await CustomerModel.findAll({ where: { mobile: newCustomer.mobile } })
    console.log(oldCustomers[0])

    newAppointment.customer_id = oldCustomers[0].dataValues.id
    const savedAppointment = await AppointmentModel.create(newAppointment);
    console.log('Appointment has created successfully', savedAppointment);
};

test()