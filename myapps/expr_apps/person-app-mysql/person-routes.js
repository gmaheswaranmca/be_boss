const express = require("express")
//const personController = require("./person-controller-v1")
const personController = require("./person-controller")
const personAppRoutes = (app) => {
    const router = express.Router();
    router.post("/",personController.create)     //URL endpoint:  post http://localhost:8080/person/
    router.put("/:id",personController.update)   //URL endpoint:  put http://localhost:8080/person/501
    router.delete("/:id",personController.delete)//URL endpoint:  delete http://localhost:8080/person/501
    router.get("/",personController.findAll)     //URL endpoint:  get http://localhost:8080/person/
    router.get("/:id",personController.findById) //URL endpoint:  get http://localhost:8080/person/501
    app.use("/person",router);
}
module.exports = personAppRoutes