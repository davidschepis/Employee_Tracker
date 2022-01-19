insert into department (name) values ("Chabs"), ("Mabs"), ("Slabs");

insert into role (title, salary, department_id) values 
("Head Chab", 12345, 1),
("Lowly Chab", 54321, 2),
("Town Drunk", 11111, 3),
("King Chab", 394, 1);

insert into employee (first_name, last_name, role_id, manager_id) values
("Beave", "Slabby", 2, 5),
("Sally", "McSusan", 3, 6),
("Luke", "Father", 2, 6),
("Drunky", "McDrunk", 3, 5);

insert into employee (first_name, last_name, role_id) values
("Morty", "James", 1),
("King", "Chab", 4);
