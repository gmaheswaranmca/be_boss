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
    id: 2003,
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

  let findById = (id, newEmp) => {
    
    const handler = (emp) => {
        
        console.log(emp)
        if(emp === null){
            create(newEmp);
        }
        else{
            console.log(`${id} exists`)
        }
    };

    const errorHandler = (error) => {
        console.log(error)
        
    };

    EmpModel.findByPk(id).then(handler).catch(errorHandler);
};
findById(newEmp.id, newEmp)