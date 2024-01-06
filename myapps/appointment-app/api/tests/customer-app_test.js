const supertest = require("supertest");
const { app } = require("../app");


const request = supertest(app)
require("dotenv").config();

const newCustomer = {
    name:"dhoni",
    mobile:"1013",
    password:"4321",
    location:"trichy"
};
let customer_id = 0;
let token = '';
const newAppointment = {
    car_name: 'MG',
    model: 'Hector',
    appointment_date: '2024-01-16',
    service_type: 'Interior + Exterior'
 };

const tests_start_fn = async() => {
    //await mongoose.connect(process.env.MONGODB_URI);
    console.log('app tests started....')
};



const tests_finished_fn = async () => {
    //await mongoose.connection.close();
    console.log('app tests finished....')
};

// Connecting to the database before each test. 
beforeEach(tests_start_fn );
  
// Closing database connection after each test. 
afterEach(tests_finished_fn);

//-------------------------Read route root-------------------------
const test_case_read_route = async () => {
    const headers = {"Content-Type": "application/json"};
    const response = await request.get("/").set(headers);
    const result = response.body;
    //
    const expectedMessage = "App Started";
    expect(response.statusCode).toBe(200);
    expect(result.message).toBe(expectedMessage);
};

const test_route_root_fn = () => {
    it("Read route root", test_case_read_route);
};

describe("GET /", test_route_root_fn);


//-------------------------Customer App::Register Customer-------------------------
const test_case_register_customer = async () => {
    const registrationFormData = {
       ...newCustomer
    };
    const headers = {"Content-Type": "application/json"};
    const response = await request.post("/customer/register").send(registrationFormData).set(headers);
    const savedCustomer = response.body;
    //
    expect(response.statusCode).toBe(200);
};

const test_register_customer = () => {
    it("Customer App::Register Customer", test_case_register_customer);
};
describe("POST /customer/registration", test_register_customer);

//-------------------------Customer App::Login Customer-------------------------
const test_case_login_customer = async () => {
    const loginData = {
       mobile: newCustomer.mobile,
       password: newCustomer.password 
    };
    const headers = {"Content-Type": "application/json"};
    const response = await request.post("/customer/login").send(loginData).set(headers);
    const loggedInData = response.body;
    token = loggedInData.user.token;
    customer_id = loggedInData.user.customer_id;
    //
    expect(response.statusCode).toBe(200);
    expect(loggedInData.isValidLogin).toBe(true);
    expect(loggedInData.message).toBe('Successful Login');
};

const test_login_customer = () => {
    it("Customer App::Login Customer", test_case_login_customer);
}

describe("POST /customer/login", test_login_customer);

//-------------------------Customer App::Fix Appointment//-------------------------
const test_case_fix_appointment = async () => {
    const appointment = {
        ...newAppointment,
        customer_id: customer_id
    };
    //console.log('...appointment::::',appointment)
    //console.log('...token::::',token)
    const headers = {'Content-Type': 'application/json', 'x-access-token': token};
    const response = await request.post("/appointment").send(appointment).set(headers);
    const savedAppointment = response.body;
    //console.log('...savedAppointment::::',savedAppointment)
    //
    expect(response.statusCode).toBe(200);
    expect(savedAppointment.isLoggedIn).toBe(true);
};

const test_fix_appointment = () => {
    it("Customer App::Fix Appointment", test_case_fix_appointment);
}

describe("POST /appointment", test_fix_appointment);