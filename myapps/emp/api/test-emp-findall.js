const { EmpModel } = require('./models')

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