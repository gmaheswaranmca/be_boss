const { EmpModel, sequelize } = require('./models')
const appConfig = require("./config")


 receiveCsvIntoFile = () => {
    util = require("util");
    multer = require("multer");
    maxSize = appConfig.maxCsvFileSize;

    storage = multer.diskStorage(
        {
            destination: (req, file, cb) => {
                cb(null, __basedir + "/resources/static/assets/uploads/");
            },
            filename: (req, file, cb) => {
                console.log(file.originalname);
                cb(null, file.originalname);
            },
        }
    );

    let uploadFile = multer(
            {
                storage: storage,
                limits: { fileSize: maxSize },
            }
        ).single("file");

    let uploadFileMiddleware = util.promisify(uploadFile);
    return uploadFileMiddleware;
}

class EmpBulkUploadController{
    constructor(){

    }
    parseCsv = ()=>{
        const csv = require('csv-parser')
        const fs = require('fs')
        const results = [];
        
        fs.createReadStream(__basedir + "/resources/static/assets/uploads/" + 'emp.csv')
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
            this.uploadAllEmp(results); //!!!XXX UPLOAD to DB XXX!!!
            //console.log(results[0])
            //console.log(results);
            // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]
          });
    } 
    uploadAllEmp = async(emps)=>{
        let toSqlDate = (dt) => {
            if(dt === ''){
                return null
            }

            let [mon,day,year] = dt.split('/')
            let doPrefixZero = (str) => ((str.length == 1 ? '0' : '') + str);
            day = doPrefixZero(day);
            mon = doPrefixZero(mon);
            let sqlDate = `${year}-${mon}-${day}`; //YYYY-MM-DD
            return sqlDate;
        }
        let trimNumber = (str) => { return str.trim().replace(/[^\w\s]/gi, ''); };
        let sanitizeEmp = (emp) => {
            emp.id = trimNumber(emp.id)
            if(emp.id === ''){
                emp.id = '0';
            }
            emp.id = parseInt(emp.id);
            emp.salary = parseInt(trimNumber(emp.salary)) + .0;
            emp.bonus_per = parseInt(trimNumber(emp.bonus_per)) + .0;
            emp.age = parseInt(trimNumber(emp.age));
            emp.hire_date = toSqlDate(emp.hire_date)
            emp.exit_date = toSqlDate(emp.exit_date)
        }
        let i = 0;
        for(let e of emps){
            sanitizeEmp(e);
            if(e.id === 0){
                continue;
            }
            console.log('------------------------------------',i)
            await this.uploadOneEmp(e)
            console.log('------------------------------------end ',i)
            i++;
        }
    }
    
    createEmp = async(newEmp) => {
        /*const handler = (savedEmp) => {
            console.log(`LOG001-[input=${newEmp.name}, processed=${savedEmp.name}] Emp Created Successfully `)
        };
    
        const errorHandler = (error) => {
            console.log('ERR003',error.name)
        };
    
        EmpModel.create(newEmp).then(handler).catch(errorHandler);
        */
        try{
            //console.log(`LOG004-`)
            let savedEmp = await EmpModel.create(newEmp);
            console.log(`LOG005-[input=${newEmp.name}, processed=${savedEmp.name}] Emp Created Successfully `)
        }catch(error){
            console.log('ERR003',error.name)
        }

    }
    uploadOneEmp = async(newEmp) => {
        /*const handler = (emp) => {
            //console.log(emp)
            if(emp === null){                
                this.createEmp(newEmp);                
            }
            else{
                console.log(`ERR001 ${newEmp.id} exists already.`)
            }
        };
    
        const errorHandler = (error) => {
            console.log('ERR002',error.name)            
        };
        EmpModel.findByPk(newEmp.id).then(handler).catch(errorHandler);
        */
        try{
            //console.log(`LOG001-`)
            let emp = await EmpModel.findByPk(newEmp.id);
            //console.log(`LOG002-`)
            if(emp === null){    
                //console.log(`LOG003-`)            
                await this.createEmp(newEmp);  
                //console.log(`LOG006-`)                
            }
            else{
                console.log(`ERR001 ${newEmp.id} exists already.`)
            }
        }catch(error){
            console.log('ERR002',error.name)
        }
        
    }
    receiveEmpCsvFile = async (req, res) => {
        let uploader = receiveCsvIntoFile();
        try {
          await uploader(req, res);
      
          if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
          //upload records to the database
          this.parseCsv();
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        } catch (err) {
          res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
          });
        }
    }

    readJobTitleBasedSalaries = async(request, response)=>{
        const { QueryTypes } = require('sequelize');
        const job_title_based_salaries = await sequelize.query(
`SELECT job_title, sum(salary) total_salary 
FROM emp WHERE job_title<>'' 
GROUP BY job_title 
ORDER BY 2 
DESC 
LIMIT 0,9;`
        , { type: QueryTypes.SELECT });
        console.log('-----')
        console.log(job_title_based_salaries)
        console.log('-------------')
        response.send(job_title_based_salaries);
      }
    
}

module.exports = { EmpBulkUploadController };

