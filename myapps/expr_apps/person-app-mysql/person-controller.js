const { PersonModel } = require('./models')
const HTTP_STATUS_SERVER_ERROR = 500;
class PersonController{
    create = (request, response) => {
        const newPerson = {
            firstName: request.body.firstName,
            lastName: request.body.lastName
        }

        const handler = (savedPerson) => {
            response.send(savedPerson)
        };

        const errorHandler = (error) => {
            response.status(HTTP_STATUS_SERVER_ERROR).send({error});
        };

        PersonModel.create(newPerson).then(handler).catch(errorHandler);
    };

    update = (request, response) => {
        const id = request.params.id;

        const oldPerson = {
            firstName: request.body.firstName,
            lastName: request.body.lastName
        };

        const where = {where:{id}};

        const handler = (updatedPerson) => {
            response.send({...oldPerson, id});
        };

        const errorHandler = (error) => {
            response.status(HTTP_STATUS_SERVER_ERROR).send({error});
        }

        PersonModel.update(oldPerson, where).then(handler).catch(errorHandler);
    };
    delete = (request, response) => {
        const id = request.params.id;

        const handler = () => {
            response.send({status:'deleted', message:'Person Deleted Successfully'});
        };

        const errorHandler = (error) => {
            response.status(HTTP_STATUS_SERVER_ERROR).send({error});
        };

        const where = {where:{id}};

        PersonModel.destroy(where).then(handler).catch(errorHandler);
    };

    findAll = (request, response) => {
        const handler = (persons) => {
            response.send(persons);
        };

        const errorHandler = (error) => {
            response.status(HTTP_STATUS_SERVER_ERROR).send({error});
        };

        PersonModel.findAll().then(handler).catch(errorHandler);
    };

    findById = (request, response) => {
        const id = request.params.id;

        const handler = (person) => {
            response.send(person);
        };

        const errorHandler = (error) => {
            response.status(HTTP_STATUS_SERVER_ERROR).send({error});
        };

        PersonModel.findByPk(id).then(handler).catch(errorHandler);
    };
}

module.exports = new PersonController()