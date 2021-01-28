const inquirer = require("inquirer");
const allEmployees = require("./server");


const initialQuestions = [
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", 
      "View All Employees By Department", 
      "View All Employees By Manager"],
      name: "initialQuestion",
    }
  ];


  const init = () => {
      inquirer.prompt(initialQuestions).then((response) => {
        switch(response.initialQuestion){
          case 'View All Employees':
            allEmployees();
            break;
        }
      })
  }
  init();


// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles