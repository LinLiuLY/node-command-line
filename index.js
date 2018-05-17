/**
 * Recursive prompt example
 * Allows user to choose when to exit prompt
 */

'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
let output = [];

const questions = [
  {
    type: 'input',
    name: 'tvShow',
    message: "What's your favorite TV show?"
  }
];

function ask() {
  inquirer.prompt(questions).then(answers => {
    const currentAnswer = answers.tvShow;

    output.push(currentAnswer);

    if (currentAnswer === 'stop') {
      console.log(chalk.green(output.join('\n')));
      console.log('Your favorite TV Shows:', output.join(', '));
    } else {
      console.log(chalk.green(currentAnswer));
      ask();
    }
  });
}

ask();