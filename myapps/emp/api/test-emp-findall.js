const { EmpModel, sequelize } = require('./models')
/*
findAll = () => {
    const handler = (persons) => {
        console.log('success',persons)
    };

    const errorHandler = (error) => {
        console.log('error',error)
    };

    EmpModel.findAll().then(handler).catch(errorHandler);
};
findAll();
*/
const f = async() => {
    const { QueryTypes } = require('sequelize');
    const job_title_based_salaries = await sequelize.query(
    `SELECT job_title, sum(salary) total_salary 
    FROM emp WHERE job_title<>'' 
    GROUP BY job_title 
    ORDER BY 2 
    DESC 
    LIMIT 0,9;`, { type: QueryTypes.SELECT });
    console.log(job_title_based_salaries)
}
f();
