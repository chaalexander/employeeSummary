const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const questions = [{
        type: "input",
        message: "What is your full name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your Employee Id?",
        name: "id"
    },
    {
        type: "Input",
        message: "What is you  email address?",
        name: "email"
    },
    {
        type: "list",
        message: "Employee type.",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    },
    {
        type: "list",
        message: "Number of Employees",
        choices: [1, 2, 3, "no more Employees"],
        name: "employeeNumber"
    }
]

function inquireQuestions() {
    inquirer
        .prompt(questions)
        .then(function (response) {
            if (response.role === "Manager") {
                inquirer.prompt({
                    type: "input",
                    message: "What is your office number?",
                    name: "officeNum"
                }).then(function (manager) {
                    console.log(manager.officeNum);
                })
            } else if (response.role === "Engineer") {
                inquirer.prompt({
                    type: "input",
                    message: "What is your GithHub username?",
                    name: "github"
                }).then(function (engineer) {
                    console.log(engineer.github);
                })
            } else if (response.role === "Intern") {
                inquirer.prompt({
                    type: "input",
                    message: "What school did you attend?",
                    name: "school"
                }).then(function (intern) {
                    console.log(intern.school);
                })
            }

        })
}
inquireQuestions()