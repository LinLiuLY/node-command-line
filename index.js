//node index --list input/employees.csv

var program = require('commander');
var inquirer = require('inquirer');

const csv = require('csv');
const fs = require('fs');

program
  .version('0.0.1')
  .option('-l, --list [list]', 'list of customers in CSV file')
  .parse(process.argv);

//Runtime User Inputs
//node index --list input/employees.csv
let questions = [
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
let parse = csv.parse;
let stream = fs.createReadStream(program.list)
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
    });
  });
