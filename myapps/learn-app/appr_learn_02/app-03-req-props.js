const express = require('express')
const app = express()
const port = 3000

//      http://localhost:3000/user/dravid/coach/1020
//      https://localhost:3000/user/dravid/coach/1020
app.get('/user/:username/:role/:id', (req, res) => {
    let reqDetails = {
        secure: req.secure,
        protocol: req.protocol,
        hostname: req.hostname, 
        headers_host: req.headers.host,
        ip: req.ip,
        ips: req.ips,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        method: req.method,        
        params: req.params,
        query: req.query,
        body: req.body ? req.body : false,
        headers: req.headers,        
        cookies: req.cookies,
        xhr: req.xhr,
        route: req.route
        };
    console.log(reqDetails);
    res.send(reqDetails);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

