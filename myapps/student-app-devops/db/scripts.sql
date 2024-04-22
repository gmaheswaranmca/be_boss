CREATE TABLE student(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    usn VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    sem INTEGER NOT NULL,
    branch VARCHAR(20) NOT NULL,
    cgpa FLOAT NOT NULL
);


#node packages for MySQL + ORM
    $npm install sequelize mysql2