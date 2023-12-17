const { CustomerModel} = require('./models')
class CustomerController{
   register = async(request, response) => {
/*
POST http://localhost:8080/customer/register
    {
        name: 'narmada',
        mobile: '9991',
        password: '4321',
        location: 'Srirampura'
    }
*/
        let responseCode = 200;
        let responseBody = {};

        const inputCustomer = request.body;
        console.log(inputCustomer);
        
        try{
            const savedCustomer = await CustomerModel.create(inputCustomer);
            responseBody = savedCustomer;
            console.log(savedCustomer)
        }catch(error){
            console.log(error)
            responseBody = error;
            responseCode = 500;
        }    

        response.status(responseCode).send(responseBody)
   }
   login = (request, response) => {

   }
   fixAppointment = (request, response) => {

   } 
}

module.exports = { CustomerController }