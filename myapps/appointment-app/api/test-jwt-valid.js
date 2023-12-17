const jwt = require("jsonwebtoken");

const user = {
    id: '9999'
};
const appConfig = {    
    jwtSecret : 'v2m--Viji-maheswaran-muralidharan',
    jwtExpires: 5//(24 * 60 * 60) // 24 hours
};
console.log(user, appConfig)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbm5hbWUiOiI5OTkxIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzAyODEwMjM3LCJleHAiOjE3MDI4OTY2Mzd9.W0sM_-dhxRm6_e-ZUqaidtGfUGSkNhrK8QBJRAOdISk'

console.log(token)

jwt.verify(token,
    appConfig.jwtSecret,
    (err, decoded) => {
      if (err) {
        console.log('unauthorized')
        return
      }
      
      console.log('authorized', decoded)
    });