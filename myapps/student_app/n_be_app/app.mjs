import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
//1. express app instance
const app = express();
//2. register middlewares
const fe_app_origin = 'http://localhost:3000'
app.use(cors(fe_app_origin));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//3.1 sample api end point
function sayHello(req, res){
    res.send('hi world');
}
app.get('/hello', sayHello);
// 3.2 student apis
// 3.2.1 connect to mongo
const mongo_url = 'mongodb://127.0.0.1:27017/nithin_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3'
function connectToMongo(){
    mongoose.connect(mongo_url);
    console.log('Connected To DB');
}
connectToMongo();
// 3.2.2 define StudentModel
function toJson(){
    const {__v, _id, ...instance} = this.toObject(); 
    instance.id = _id;
    return instance;
}
function getStudentModel(){
    const fields = {
        usn: String,
        name: String,
        sem: Number,
        branch: String,
        cgpa: Number
    };
    const options = {
        timestamps: false
    };
    const StudentSchema = mongoose.Schema(fields, options);
    StudentSchema.method('toJSON', toJson);
    const StudentModel = mongoose.model('student',StudentSchema);
    return StudentModel;
}
const StudentModel = getStudentModel();
// 3.2.3 apis for student CRUD
async function createStudent(req, res){
    const savedStudent = await StudentModel.create(req.body);
    res.send(savedStudent);
}
async function readAllStudents(req, res){
    const students = await StudentModel.find();
    res.send(students);
}
async function readByStudentId(req, res){
    const student = await StudentModel.findOne({_id: req.params.id});
    res.send(student);
}
async function updateStudent(req, res){
    const updatedStudent = await StudentModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    res.send(updatedStudent);
}
async function deleteStudent(req, res){
    await StudentModel.findOneAndDelete({_id: req.params.id});
    res.send({message: 'Student Deleted Successfully'});
}
// 3.2.4 register apis
app.post('/students', createStudent);
app.get('/students', readAllStudents);
app.get('/students/:id', readByStudentId);
app.put('/students/:id', updateStudent);
app.delete('/students/:id', deleteStudent);
//4.run server
const server_port = 8080;
function initRunServer(){
    console.log(`Browse the server http://localhost:${server_port}/`)
}
app.listen(server_port, initRunServer);