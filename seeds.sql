INSERT INTO department (id, name)
VALUES (1, "Retail");

INSERT INTO department (id, name)
VALUES (2, "Brand Experience");

INSERT INTO department (id, name)
VALUES (3, "Human Resouces");

INSERT INTO department (id, name)
VALUES (4, "IT");

----- Role Seeds -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Stylist", 20000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Assistant Store Manager", 25000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Store Manager", 40000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Brand Manager", 30000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Business Partner", 30000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "HR Director", 50000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "System Adminstrator", 15000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "IT Coordinator", 30000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "IT Manager", 54000, 4);

----- Employees Seeds -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Charbelle", "Chaz", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Sofi", "Hernan", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Char", "Dant", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Jonathan", "Uong", 9, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Melissa", "Arm", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Alla", "Arous", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Rosie", "Cole", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Lianne", "Soon", 5, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Zach", "Soar", 7, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Martin", "Cast", 8, 10);