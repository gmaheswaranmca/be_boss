CREATE DATABASE carwash_db;

USE carwash_db;

CREATE TABLE customer(
	id int primary key auto_increment,
	name varchar(255) not null, 
	mobile varchar(20) not null, 
	password varchar(1000) not null, /* encrypted / encoded */
	location varchar(125) not null
);

CREATE TABLE appointment(
	id int primary key auto_increment,
	entry_time datetime not null default(now()),
	customer_id int not null,
	car_name varchar(50) not null,
	model varchar(50) not null,
	appointment_date datetime not null,
	service_type varchar(20) not null, /* INTERIOR, EXTERIOR, BOTH */
	staff varchar(255) not null default(''),
	cancel_reason varchar(100) not null default(''),
	status int not null default(1), /* 1-CREATED, 2-CONFIRMED, 3-CANCELLED */
    constraint appointment_customer_fk_customer_id foreign key(customer_id)
		references customer(id)
);

CREATE TABLE admin(
	id int primary key auto_increment, 
	username varchar(20) not null, 
	password varchar(1000) not null);
	
INSERT INTO admin(username, password)
	VALUES ('mahesh', md5('1234')),
		('nithin', md5('1234')),
		('rakesh', md5('1234'));
