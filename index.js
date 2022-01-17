//packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//setup db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_tracker'
},
    console.log("Connected to DB")
);


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
                ]
            }
        ]).then((response) => {
            handleResponse(response.userInput);
        }).catch((error) => {
            console.log(error);
        });
};

//this function handles the prompt for adding a new department
const createNewDepartment = () => {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "Enter the department name",
                name: "name"
            }
        ]
    ).then((response) => {
        addDepartmentToDB(response.name);
    }).catch((error) => {
        console.log(error);
    });
};

//this function handles the prompt for adding a new role
const createNewRole = async () => {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "Enter the title of the role",
                name: "title",
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
                choices: await getDepartmentNames()
            }
        ]
    ).then((response) => {
        addNewRoleToDB(response.title, response.salary, response.department);
    }).catch((error) => {
        console.log(error);
    });
};

//this function handles the prompt for adding a new employee
const createNewEmployee = async () => {
    inquirer.prompt(
        [
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
                choices: await getEmployeeRoles()
            },
            {
                type: "list",
                message: "Enter the employee's manager",
                name: "manager",
                choices: await getManagerNames()
            }
        ]
    ).then((response) => {
        addNewEmployeeToDB(response.firstName, response.lastName, response.role, response.manager);
    }).catch((error) => {
        console.log(error);
    });
};

//this function handles the prompt for updating an employee's role
const updateEmployeeRole = async () => {
    inquirer.prompt(
        [
            {
                type: "list",
                message: "Which employee to update?",
                name: "employee",
                choices: await getEmployeeNames()
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: await getEmployeeRoles()
            }
        ]
    ).then((response) => {
        handleUpdateEmployeeRole(response.employee, response.role);
    }).catch((error) => {
        console.log(error);
    });
};

//this function selects what to do based on the users response
const handleResponse = (response) => {
    switch (response) {
        case "View All Departments": showDepartmentNames();
            break;
        case "View All Roles": showRoles();
            break;
        case "View All Employees": showEmployees();
            break;
        case "Add A Department": createNewDepartment();
            break;
        case "Add A Role": createNewRole();
            break;
        case "Add An Employee": createNewEmployee();
            break;
        case "Update Employee Role": updateEmployeeRole();
            break;
        default:
            db.end();
            process.exit();//goodbye
    }
};

//handles the sql commands to add a new department
const addDepartmentToDB = (name) => {
    db.promise().query(`insert into department (name) values ("${name}")`)
        .then((response) => {
            console.info(`${name} department added to the db`);
            getUserInput();
        })
};

//uses sql to return all department names from the database in an array
const getDepartmentNames = async () => {
    return new Promise(resolve => {
        let names = [];
        db.promise().query(`select * from department`)
            .then((response) => {
                for (let i = 0; i < response[0].length; i++) {
                    names.push(response[0][i].name);
                }
            }).catch(console.log);
        resolve(names);
    });
};

//adds a new role to the role table
const addNewRoleToDB = (title, salary, department) => {
    db.promise().query(`select department.id from department where department.name = "${department}"`)
        .then((response) => {
            department = response[0][0].id;
            db.promise().query(`insert into role (title, salary, department_id) values ("${title}", "${salary}", "${department}")`).then((response) => {
                console.info(`${title} role with ${salary} salary added to the db`);
                getUserInput();
            });
        });
};

//adds a new employee to the employee table
const addNewEmployeeToDB = (firstName, lastName, role, manager) => {
    const managerDetails = getName(manager);
    db.promise().query(`select employee.id from employee where employee.first_name="${managerDetails[0]}" and employee.last_name="${managerDetails[1]}"`)
        .then((response) => {
            let id = 0;
            if (manager !== "None") {
                id = response[0][0].id;
            }
            db.promise().query(`select role.id from role where role.title="${role}"`)
                .then((response) => {
                    let roleID = response[0][0].id;
                    db.promise().query(`insert into employee (first_name, last_name, role_id, manager_id) values ("${firstName}", "${lastName}", "${roleID}", "${id}")`)
                        .then((response) => {
                            console.info(`${firstName} ${lastName} RoleID: ${roleID} ManagerID: ${id} added to the db`);
                            getUserInput();
                        });
                });
        });
};

//returns all roles as an array
const getEmployeeRoles = () => {
    return new Promise(resolve => {
        let roles = [];
        db.promise().query(`select * from role`)
            .then((response) => {
                for (let i = 0; i < response[0].length; i++) {
                    roles.push(response[0][i].title);
                }
            }).catch(console.log);
        resolve(roles);
    });
};

//returns an array of all the managers
const getManagerNames = () => {
    return new Promise(resolve => {
        let names = [];
        names.push("None");
        db.promise().query(`select distinct b.first_name, b.last_name from employee as a, employee as b where a.manager_id = b.id`)
            .then((response) => {
                for (let i = 0; i < response[0].length; i++) {
                    names.push(response[0][i].first_name + " " + response[0][i].last_name);
                }
                resolve(names);
            }).catch(console.log);
    });
};

//returns all employees's names
const getEmployeeNames = () => {
    return new Promise(resolve => {
        db.promise().query("select * from employee")
            .then((response) => {
                let names = [];
                for (let i = 0; i < response[0].length; i++) {
                    names.push(response[0][i].first_name + " " + response[0][i].last_name);
                }
                resolve(names);
            })
    })
};

//updates an employee to have a new role
const handleUpdateEmployeeRole = async (employee, role) => {
    let roleID = await getRoleID(role);
    let name = getName(employee);
    db.promise().query(`update employee set role_id=${roleID} where employee.first_name="${name[0]}" and employee.last_name="${name[1]}"`)
        .then((response) => {
            console.info(`Employee ${employee} updated to role ${role}`);
        });
        getUserInput();
};

//helper function to get a role id from role name
const getRoleID = (role) => {
    return new Promise(resolve => {
        db.promise().query(`select role.id from role where role.title="${role}"`)
            .then((response) => {
                resolve(response[0][0].id);
            });
    });
};

//simply splits a string based on a space
const getName = (employee) => {
    return employee.split(" ");
};

//displays all departments in table
const showDepartmentNames = async () => {
    await db.promise().query(`select * from department`)
        .then((response) => {
            console.table(response[0]);
        }).catch(console.log);
    getUserInput();
};

//displays all roles in table
const showRoles = async () => {
    await db.promise().query(`select * from role`)
        .then((response) => {
            console.table(response[0]);
        }).catch(console.log);
    getUserInput();
};

//displays all employees in table
const showEmployees = async () => {
    await db.promise().query(`select * from employee`)
        .then((response) => {
            console.table(response[0]);
        }).catch(console.log);
    getUserInput();
};

//initialize app
getUserInput();