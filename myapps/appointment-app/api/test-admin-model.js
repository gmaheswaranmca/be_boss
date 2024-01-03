const { CustomerModel, AppointmentModel, AdminModel, sequelize } = require('./models')
const { QueryTypes } = require('sequelize')
const md5 = require('md5')


let sqlAptmt = `SELECT appointment.id, entry_time, customer_id, 
car_name, model, appointment_date, service_type, 
staff, cancel_reason, status,
customer.name as customer_name, customer.mobile, customer.location 
FROM appointment 
    INNER JOIN customer ON(appointment.customer_id = customer.id)`

const test = async () => {
    const sqlAppointments = sqlAptmt + ' WHERE (status = 1)'
    const appointments = await sequelize.query(sqlAppointments, { type: QueryTypes.SELECT });
    console.log('\n\nappointments:::::',appointments)

    if(appointments.length >= 1){
        if(appointments.length % 2 == 0){
            console.log('\n\nConfirmation...')
            const id = appointments[appointments.length - 1].id
            console.log('id',id)
            const a = await AppointmentModel.findByPk(id);
            console.log(a)
            const entity = {
                staff : 'STAFF 1',
                status : 2
            }
            let savedA = await AppointmentModel.update(entity, {where:{id:id}})
            console.log('Appointment has confirmed',savedA)
        }else{
            console.log('\n\nCancellation...')
            const id = appointments[appointments.length - 1].id
            const a = await AppointmentModel.findByPk(id);
            const entity = {
                cancel_reason : 'SOME REASON',
                status : 3
            }
            let savedA = await AppointmentModel.update(entity,{where:{id:id}})
            console.log('Appointment has cancelled',savedA)
        }
    }

    
    const sqlHistory = sqlAptmt + ` WHERE status IN(2,3) `
    let param = 2

    const sqlHistoryConfirmed = sqlHistory + ` AND ((status = ${param}) OR (${param} = 4))`
    const historyConfirmed = await sequelize.query(sqlHistoryConfirmed, { type: QueryTypes.SELECT });
    console.log('\n\nhistory confirmed:::::', historyConfirmed)

    param = 3
    const sqlHistoryCancelled= sqlHistory + `AND ((status = ${param}) OR (${param} = 4))`
    const historyCancelled = await sequelize.query(sqlHistoryCancelled, { type: QueryTypes.SELECT });
    console.log('\n\nhistory cancelled:::::', historyCancelled)

    param = 4
    const sqlHistoryBoth= sqlHistory + ` AND ((status = ${param}) OR (${param} = 4))`
    const historyBoth = await sequelize.query(sqlHistoryBoth, { type: QueryTypes.SELECT });
    console.log('\n\nhistory both:::::', historyBoth)


    const admin = await AdminModel.findOne({where:{username:'mahesh'}})
    console.log('\n\nadmin',admin)
    if(admin.dataValues.password === md5('1234')){
        console.log('Logged In')
    }else{
        console.log('Invalid Username / Password')
    }

    const admin1 = await AdminModel.findOne({where:{username:'rakesh'}})
    console.log('\n\nadmin',admin1)
    if(admin1.dataValues.password === md5('4564')){
        console.log('Logged In')
    }else{
        console.log('Invalid Username / Password')
    }
};

test()


