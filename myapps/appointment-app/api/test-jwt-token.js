const jwt = require("jsonwebtoken");

const user = {
    id: '9999'
};
const appConfig = {    
    jwtSecret : 'v2m--Viji-maheswaran-muralidharan',
    jwtExpires: 45// (24 * 60 * 60) // 24 hour
};
console.log(user, appConfig)
const token = jwt.sign({ id: user.id },
    appConfig.jwtSecret,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: appConfig.jwtExpires, 
    });

console.log(token)
