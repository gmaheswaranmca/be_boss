const db = {
    host: "localhost",
    port: 3316,
    user: "root",
    password: "4321",
    db: "carwash_db",
    dialect: "mysql",
    pool_max : 5,
    pool_min : 0,
    pool_acquire: 30000,
    pool_idle: 10000
};
const appConfig = {
    port : 8080,
    frontEnd : 'http://localhost:3000',
    db: db,
    jwtSecret : 'v2m--Viji-maheswaran-muralidharan',
    jwtExpires: (24 * 60 * 60) // 24 hour
};

module.exports = appConfig;