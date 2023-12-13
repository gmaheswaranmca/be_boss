const { EmpModel } = require('./models')


let create = (newEmp) => {
    const handler = (savedEmp) => {
        console.log('success',savedEmp)
    };

    const errorHandler = (error) => {
        console.log('error',error)
    };

    EmpModel.create(newEmp).then(handler).catch(errorHandler);
};

const newEmp = {
    id: 2002,
    name: 'Kai Le',
    job_title: 'Controls Engineer',
    dept: 'Engineering',
    business_unit: 'Manufacturing',
    gender: 'Male',
    ethnicity: 'Asian',
    age: 47,
    hire_date: '2022-02-05',
    salary: 92368,
    bonus_per: 0,
    country: 'United States',
    city: 'Columbus'
  }

create(newEmp)