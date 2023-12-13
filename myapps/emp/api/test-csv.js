const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('emp.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results[0])
    //console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });


// '2/5/2022'.split('/')
//'$92,368 '.replace(/[^\w\s]/gi, '').trim()
/*
findById()
  not exist: create(employee) 

CREATE TABLE emp(
  id int primary key auto_increment,
  name varchar(255) not null,
  job_title varchar(125) not null,
  dept varchar(125) not null,
  business_unit varchar(125) not null,
  gender varchar(10) not null,
  ethnicity varchar(50) not null,
  age int not null,
  hire_date datetime not null,
  salary float not null,
  bonus_per float not null,
  country varchar(125) not null,
  city varchar(125) not null,
  exit_date datetime null,
  photo longblob null);

  $npm install express cors sequelize mysql2 multer
  */