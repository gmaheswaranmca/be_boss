const express = require("express")
const app = express()
const port = 8080;
const appListener = () => {
    console.log(`Server listens on ${port}, http://localhost:${port}`)
}
app.listen(port, appListener)