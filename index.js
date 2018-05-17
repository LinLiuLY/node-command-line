//Runtime User Inputs
//node index --list input/employees.csv

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const csv = require('csv');
const fs = require('fs');

program
  .version('0.0.1')
  .option('-l, --list [list]', 'list of customers in CSV file')
  .parse(process.argv);

const questions = [
  {
    type : "input",
    name : "sender.email",
    message : "Sender's email address - "
  },
  {
    type : "input",
    name : "sender.name",
    message : "Sender's name - "
  },
  {
    type : "input",
    name : "subject",
    message : "Subject - "
  }
];

let contactList = [];
const parse = csv.parse;
const stream = fs.createReadStream(program.list)
  .pipe(parse({ delimiter : "," }));

stream
  .on("error", function (err) {
    return console.error(err.message);
  })
  .on("data", function (data) {
    let name = data[0] + " " + data[1];
    let email = data[2];
    contactList.push({ name : name, email : email });
  })
  .on("end", function () {
    inquirer.prompt(questions).then(function (answers) {
      console.log(answers);
      console.log(chalk.green(contactList.length));
    });
  });
