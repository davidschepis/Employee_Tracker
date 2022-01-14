//packages
const inquirer = require("inquirer");





//this function prompts the user for input from the console
const getUserInput = () => {
    inquirer.prompt(
        [
            {
                type: "list",
                message: "What would you like to do?",
                name: "userInput",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add A Department",
                    "Add A Role",
                    "Add An Employee",
                    "Update Employee Role",
                    "Quit"
                ],
            },
        ]).then((response) => {
            handleResponse(response.userInput);
        }).catch((error) => {
            console.log(error);
        });
};

//this function handles the prompt for adding a new department
const createNewDepartment = () => {
    inquirer.prompt(
        {
            type: "input",
            message: "Enter the department name",
            name: "name",
        }
    ).then((response) => {
        addDepartmentToDB(response.name);
    }).catch((error) => {
        console.log(error);
    });
};

//this function handles the prompt for adding a new role
const createNewRole = () => {
    inquirer.prompt(
        {
            type: "input",
            message: "Enter the name of the role",
            name: "name",
        },
        {
            type: "input",
            message: "Enter the salary for the role",
            name: "salary",
        },
        {
            type: "list",
            message: "Which department does this role belong to?",
            name: "department",
            choices: getDepartmentNames()
        }
    ).then((response) => {
        addNewRoleToDB(response.name, response.salary, response.department);
    }).catch((error) => {
        console.log(error);
    });
};

//this function handles the prompt for adding a new employee
const createNewEmployee = () => {
    inquirer.prompt(
        {
            type: "input",
            message: "Enter the employee's first name",
            name: "firstName",
        },
        {
            type: "input",
            message: "Enter the employee's last name",
            name: "lastName",
        },
        {
            type: "list",
            message: "Enter the employee's role",
            name: "role",
            choices: getEmployeeRoles()
        },
        {
            type: "list",
            message: "Enter the employee's manager",
            name: "manager",
            choices: getManagerNames()
        }
    ).then((response) => {
        addNewEmployeeToDB(response.firstName, response.lastName, response.role, response.manager);
    }).catch((error) => {
        console.log(error);
    });
};

//this function handles the prompt for updating an employee's role
const updateEmployeeRole = () => {
    inquirer.prompt(
        {
            type: "list",
            message: "Which employee to update?",
            name: "employeeName",
            choices: getEmployeeNames()
        },
        {
            type: "list",
            message: "What is the employee's new role?",
            name: "manager",
            choices: getEmployeeRoles()
        }
    ).then((response) => {
        addNewEmployeeToDB(response.firstName, response.lastName, response.role, response.manager);
    }).catch((error) => {
        console.log(error);
    });
};

//this function selects what to do based on the users response
const handleResponse = (response) => {
    switch(response) {
        case "View All Departments" : showDepartmentNames();
        break;
        case "View All Roles" : showRoles();
        break;
        case "View All Employees" : showEmployees();
        break;
        case "Add A Department" : createNewDepartment();
        break;
        case "Add A Role" : createNewRole();
        break;
        case "Add An Employee" : createNewEmployee();
        break;
        case "Update Employee Role" : updateEmployeeRole();
        break;
        default: 
        return;
    }
};

const addDepartmentToDB = (name) => {

};

const getDepartmentNames = () => {

};

const addNewRoleToDB = (name, salary, department) => {

};

const addNewEmployeeToDB = (firstName, lastName, role, manager) => {

};

const getEmployeeRoles = () => {

};

const getManagerNames = () => {

};

const getEmployeeNames = () => {

};

const showDepartmentNames = () => {

};

const showRoles = () => {

};

const showEmployees = () => {

};

getUserInput();