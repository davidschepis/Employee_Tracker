drop database if exists employee_tracker;

create database employee_tracker;

use employee_tracker;

create table department (
    id int primary key auto_increment,
    name varchar(30)
);

create table role (
    id int primary key auto_increment,
    title varchar(30),
    salary decimal,
    department_id int
);

create table employee (
    id int primary key auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
);