const { response } = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "harryjack1214",

  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  return connection.threadId;
});

function allEmployees() {
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC",
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}

const initialQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add an Employee",
      "Update an Employee",
      "Delete an Employee",
      "Exit Database",
    ],
    name: "initialQuestion",
  },
];

const init = () => {
  inquirer.prompt(initialQuestion).then((response) => {
    switch (response.initialQuestion) {
      case "View All Employees":
        allEmployees();
        break;
      case "Add an Employee":
        addEmployees();
        break;
      case "Update an Employee":
        updateEmployee();
        break;
      case "Delete an Employee":
        deleteEmployee();
        break;
      case "Exit Database":
        return;
    }
  });
};
init();

let displayRolesArray = [];
function selectRoles() {
  connection.query("SELECT * FROM role", function (err, response) {
    if (err) throw err;
    for (var i = 0; i < response.length; i++) {
      const allRoles = response[i].title;
      displayRolesArray.push(allRoles);
    }
  });
  return displayRolesArray;
}

let displayManagerArray = [];
function selectManagers() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.title LIKE '%Manager%'",
    function (err, response) {
      if (err) throw err;
      for (var i = 0; i < response.length; i++) {
        const fullNamesManagers = response[i].first_name.concat(
          " ",
          response[i].last_name
        );

        displayManagerArray.push(fullNamesManagers);
      }
    }
  );
  return displayManagerArray;
}

const addEmployeeQuestions = [
  {
    type: "input",
    message: "Enter employee first name",
    name: "firstname",
  },
  {
    type: "input",
    message: "Enter employee last name",
    name: "lastname",
  },
  {
    type: "list",
    message: "Choose a role",
    choices: selectRoles(),
    name: "role",
  },
  {
    type: "list",
    message: "Choose a manager",
    choices: selectManagers(),
    name: "manager",
  },
];

function addEmployees() {
  inquirer.prompt(addEmployeeQuestions).then((response) => {
    const roleNo = displayRolesArray.indexOf(response.role) + 1;
    const managerNo = displayManagerArray.indexOf(response.manager) + 1;
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: response.firstname,
        last_name: response.lastname,
        role_id: roleNo,
        manager_id: managerNo,
      },
      function (err, response) {
        if (err) throw err;
        console.log(response);
        allEmployees();
      }
    );
  });
}

function updateEmployee() {
  connection.query("SELECT title FROM role", function (err, response) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "fullName",
          type: "rawlist",
          choices: selectEachEmployee(),
          message: "What is the Employee's full name? ",
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the Employees new title? ",
          choices: selectRoles(),
        },
      ])
      .then(function (value) {

        const roleArr = [];
        for (var i = 0; i < response.length; i++) {
          roleArr.push(response[i].title);
        }
        const roleIdName = roleArr.indexOf(value.role) + 1;

        connection.query("UPDATE employee SET role_id = ? WHERE concat(employee.first_name, ' ' ,  employee.last_name) = ?",
        [roleIdName, value.fullName],
        function(err, response){
          if(err) throw err;
          console.log(response)
          allEmployees();
        })
      });
  });
}

let eachEmployeeArray = [];
function selectEachEmployee() {
  connection.query(
    "SELECT concat(employee.first_name, ' ' ,  employee.last_name) AS fullname FROM employee",
    function (err, response) {
      if (err) throw err;
      for (var i = 0; i < response.length; i++) {
        const fullnamesEmployee = response[i].fullname;
        eachEmployeeArray.push(fullnamesEmployee);
      }
    }
  );
  return eachEmployeeArray;
}

const deleteQuestions = [
  {
    type: "rawlist",
    message: "Choose a employee to be deleted.",
    choices: selectEachEmployee(),
    name: "delete",
  },
];

function deleteEmployee() {
  inquirer.prompt(deleteQuestions).then((response) => {
    console.log(response);
    connection.query(
      "DELETE FROM employee WHERE concat(employee.first_name, ' ' ,  employee.last_name) = ?",
      [response.delete],
      function (err, response) {
        if (err) throw err;
        console.log(response);
        allEmployees();
      }
    );
  });
}




