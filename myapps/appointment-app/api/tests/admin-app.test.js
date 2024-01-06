const supertest = require("supertest");
const { app } = require("../app");

const request = supertest(app)
require("dotenv").config();

const admin = {
    username:"mahesh",
    password:"1234"
};
var token = '';
const appointmentMaster = {
    staff: 'STAFF 1',
    cancel_reason: 'STAFFs are busy'
 };
 var appointments = []

const tests_start_fn = async() => {
    console.log('app tests started....')
};

const tests_finished_fn = async () => {
    console.log('app tests finished....')
};

// Connecting to the database before each test. 
beforeEach(tests_start_fn );
  
// Closing database connection after each test. 
afterEach(tests_finished_fn);

//-------------------------Admin App::Login-------------------------
const test_case_admin_login = async (username, password) => {
    const loginData = {
        username: username,
        password: password 
     };
     const headers = {"Content-Type": "application/json"};
     const response = await request.post("/admin/login").send(loginData).set(headers);
     const loggedInData = response.body;
     if(loggedInData.isValidLogin){
        token = loggedInData.user.token;
     }
     //
     expect(response.statusCode).toBe(200);
     expect(loggedInData.isValidLogin).toBe(true);
     expect(loggedInData.message).toBe('Successful Login');
};

const test_admin_login = () => {
    it("Admin App::Login Successful",async() => test_case_admin_login(admin.username, admin.password));
    it("Admin App::Login Username Failure",async() => test_case_admin_login('abcd', admin.password));
    it("Admin App::Login Password Failure",async() => test_case_admin_login(admin.username, 'xyz'));
};

describe("GET /admin/login", test_admin_login);
var cnt = 0
//-------------------------Admin App::View Appointment-------------------------
const test_case_view_appointment = async (token) => {
     const headers = {"Content-Type": "application/json", 'x-access-token': token};
     const response = await request.get("/appointment/view").set(headers);
     const result = response.body;
     
     //
     console.log('111111112222');
     expect(response.statusCode).toBe(200);
     expect(result.isLoggedIn).toBe(true);
     
     if(result.isLoggedIn){
        appointments = result.appointments;
        console.log('11111111#' + appointments.length);
        
        cnt++;
        expect(appointments.length).toBeGreaterThanOrEqual(1);
     }
};

const test_view_appointment = () => {
    it("Admin App::View Appointment, Valid Login Token", async() => test_case_view_appointment(token));
    it("Admin App::View Appointment, Invalid Login Token#" + appointments.length + ",cnt=" + cnt, async() => test_case_view_appointment('12345abcde'));
};

describe("GET /appointment/view", test_view_appointment);

//-------------------------Admin App::History Of Appointment-------------------------
const test_case_history_of_appointment = async (historyType, token) => {
    const headers = {"Content-Type": "application/json", 'x-access-token': token};
    const response = await request.get(`/appointment/history/${historyType}`).set(headers);
    const result = response.body;
    //
    expect(response.statusCode).toBe(200);
    expect(result.isLoggedIn).toBe(true);
    if(result.isLoggedIn){
        const histories = result.appointments;
        expect(histories.length).toBeGreaterThanOrEqual(1);
     }
};

const test_history_of_appointment = () => {
    const HISTORY_TYPE_CONFIRMED = 2;
    const HISTORY_TYPE_CANCELLED = 3;
    const HISTORY_TYPE_BOTH = 4;
    it("Admin App::History Of Confirmed Appointment, Valid Login Token", 
        async() => test_case_history_of_appointment(HISTORY_TYPE_CONFIRMED, token));
    it("Admin App::History Of Cancelled Appointment, Valid Login Token", 
        async() => test_case_history_of_appointment(HISTORY_TYPE_CANCELLED, token));
    it("Admin App::History Of Confirmed and Cancelled Appointment, Valid Login Token", 
        async() => test_case_history_of_appointment(HISTORY_TYPE_BOTH, token));
    it("Admin App::History Of Confirmed and Cancelled Appointment, Invalid Login Token", 
        async() => test_case_history_of_appointment(HISTORY_TYPE_BOTH, '12345abcde'));
};

describe("GET /appointment/history", test_history_of_appointment);


//-------------------------Admin App::Confirm Confirmation-------------------------
const test_case_confirm_appointment = async (appointmentToUpdate, token) => {
    const headers = {"Content-Type": "application/json", 'x-access-token': token};
    const response = await request.post(`/appointment/confirm`).set(headers).send(appointmentToUpdate);
    const result = response.body;
    //
    expect(response.statusCode).toBe(200);
    expect(result.isLoggedIn).toBe(true);
    if(result.isLoggedIn) {
        //
     }
};

const test_confirm_appointment = () => {
    if(( appointments.length > 0 ) && ( appointments.length % 2 == 1 )){    
        const appointment = appointments[appointments.length - 1]
        it("Admin App::CONFIRM APPOINTMENT, valid appointment of appointments count#" + appointments.length, 
            async() => test_case_confirm_appointment({id:appointment.id, staff: appointmentMaster.staff}, token));
    }else{
        it("Admin App::CONFIRM APPOINTMENT, no valid appointment of appointments count#" + appointments.length,
            async() => expect(1).toBe(1));
    }
       
    it("Admin App::CONFIRM APPOINTMENT, invalid appointment", 
        async() => test_case_confirm_appointment({id:1000, staff:appointmentMaster.staff}, token));    
};

describe("GET /appointment/confirm", test_confirm_appointment);

//-------------------------Admin App::Cancel Confirmation-------------------------
const test_case_cancel_appointment = async (appointmentToUpdate, token) => {
    const headers = {"Content-Type": "application/json", 'x-access-token': token};
    const response = await request.post(`/appointment/confirm`).set(headers).send(appointmentToUpdate);
    const result = response.body;
    //
    expect(response.statusCode).toBe(200);
    expect(result.isLoggedIn).toBe(true);
    if(result.isLoggedIn) {
        //
     }
};

const test_cancel_appointment = () => {
    if(( appointments.length > 0 ) && ( appointments.length % 2 == 0 )){    
        const appointment = appointments[appointments.length - 1]
        it("Admin App::Cancel APPOINTMENT, valid appointment of appointments count#" + appointments.length, 
        async() => test_case_cancel_appointment({id:appointment.id, cancel_reason: appointmentMaster.cancel_reason}, token));
    }else{
        it("Admin App::Cancel APPOINTMENT, no valid appointment of appointments count#" + 
            appointments.length + appointments.length, 
            async() => expect(1).toBe(1));
    }
       
    it("Admin App::Cancel APPOINTMENT, invalid appointment", 
        async() => test_case_cancel_appointment({id:1000, cancel_reason:appointmentMaster.cancel_reason}, token));    
};

describe("GET /appointment/confirm", test_confirm_appointment);