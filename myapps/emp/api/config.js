//1 - app configuration data such as port number, database connection details

const db = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    db: "emp_db",
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
    maxCsvFileSize : 2 * 1024 * 1024 /* 2 mb */,
    maxPhotoFileSize: 2 * 1024 * 1024 /* 2 mb */
};

module.exports = appConfig;