class PersonController{
    create = (request, response) => {
        response.send(request.body)
    }
    update = (request, response) => {
        console.log(request.params.id)
        response.send(request.body)
    }
    delete = (request, response) => {
        console.log(request.params.id)
        response.send({status:'deleted', message:'Person Deleted Successfully'})
    }
    findAll = (request, response) => {
        response.send([
            {firstName: "Rahul", lastName: "Dravid"},
            {firstName: "Rohit", lastName: "Sharma"},
            {firstName: "Virat", lastName: "Kohli"}
        ])
    }
    findById = (request, response) => {
        console.log(request.params.id)
        response.send({firstName: "Rahul", lastName: "Dravid"})
    }
}

module.exports = new PersonController()