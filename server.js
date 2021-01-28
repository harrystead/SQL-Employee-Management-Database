
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "harryjack1214",

  database: "employees_db",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

function allEmployees() {
    connection.query
    ("SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC",
    function(err, res) {
      if (err) throw err;
      console.table(res);
    });
  }

module.exports = allEmployees;




  

