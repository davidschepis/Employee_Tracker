insert into department (name) values ("Corporate"), ("Tucson Site"), ("Phoenix Site");

insert into role (title, salary, department_id) values 
("CEO", 200000, 1),
("Customer Service", 75000, 2),
("Engineer", 60000, 3),
("Site Manager", 150000, 1);

insert into employee (first_name, last_name, role_id, manager_id) values
("Steven", "Slabby", 2, 6),
("Sally", "McSusan", 3, 7),
("Luke", "Father", 2, 6),
("Kim", "Burly", 3, 7),
("Jack", "Knife", 2, 6),
("Julius", "Caesar", 4, 8),
("Adam", "Eve", 4, 8);


insert into employee (first_name, last_name, role_id) values
("Morty", "James", 1);