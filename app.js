// importing internal node packages
const path = require("path");
const fs = require("fs");

// importing external npm packages
const inquirer = require("inquirer");
const validator = require("validator");


// importing internal class modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");


const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");


// global variable
let team = [];

// inquirer questions
const questions = [{
        type: "input",
        message: "What is your full name?",
        name: "fullName",
        validate: value => {
            var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
            if (!regName.test(value)) {
                return "Please enter your full name (first & last name)";
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is your employee id?",
        name: "id",
        validate: value => {
            if (validator.isInt(value)) {
                return true
            }
            return "Please enter a valid ID Number."
        }

    },
    {
        type: "input",
        message: "Please enter your email:",
        name: "email",
        validate: value => {
            if (validator.isEmail(value)) {
                return true
            }
            return "Please enter a valid e-mail address."
        }

    },
    {
        type: "list",
        message: "What type of employee are you?",
        choices: ['Manager', 'Engineer', 'Intern'],
        name: "role"
    }
];

// main function 
const inquireQ = () => {

    inquirer
        .prompt([
            // build or finish
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["Build team", "Finish team"],
                name: "moreTeam"
            }
        ]).then(response => {
            const moreTeam = response.moreTeam;
            switch (moreTeam) {
                case "Build team":
                    inquirer.prompt(questions)
                        .then(response => {
                            if (response.role === "Manager") {
                                inquirer.prompt({
                                    type: "input",
                                    message: "What is your office number?",
                                    name: "officeNum",
                                    validate: value => {
                                        if (validator.isInt(value)) {
                                            return true
                                        }
                                        return "Please enter a valid office number"
                                    }

                                }).then(managerOffice => {
                                    var newManager = new Manager(response.fullName, response.id, response.email, managerOffice.officeNum);
                                    team.push(newManager);
                                    console.log(team);
                                    inquireQ();

                                })
                            } else if (response.role === "Engineer") {
                                inquirer.prompt({
                                    type: "input",
                                    message: "What is your github user name??",
                                    name: "github",
                                    validate: value => {
                                        var regName = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
                                        if (!regName.test(value)) {
                                            return "Please enter a valid github username.";
                                        }
                                        return true;
                                    }

                                }).then(engineerGH => {
                                    var newEngineer = new Engineer(response.fullName, response.id, response.email, engineerGH.github);
                                    team.push(newEngineer);
                                    inquireQ();

                                });
                            } else if (response.role === "Intern") {
                                inquirer.prompt({
                                    type: "input",
                                    message: "What school did you attend?",
                                    name: "school",
                                    validate: value => {
                                        if (validator.isAlpha(value)) {
                                            return true
                                        }
                                        return "Please enter a valid School Name."
                                    }
                                }).then(internSchool => {
                                    var newIntern = new Intern(response.fullName, response.id, response.email, internSchool.school);
                                    team.push(newIntern);
                                    console.log(team);
                                    inquireQ();

                                });
                            }
                        });

                    break;
                case "Finish team":
                    if (team.length > 0) {
                        console.log("all done!");
                        writeHTML(render(team));
                    } else {
                        console.log("no team members");
                    }
                    break;
                default:
                    break;
                    //end of switch

            }

        });
}

inquireQ();

const writeHTML = HTML => {
    console.log(HTML);

    fs.writeFile(outputPath, HTML, err => {
        if (err) {
            return console.log(err);
        }

        console.log("Success");


    })
}
console.log(writeHTML);