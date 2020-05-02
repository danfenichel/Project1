var inquirer = require("inquirer");
var questionList = [
    {
        type: "input",
        message: "What is your github username?",
        name: "GithubUsername"
    },
    {
        type: "list",
        message: "What's your favorite color?",
        choices: ["Blue", "Green", "Red", "Yellow", "Orange", "Purple"],
        name: "favColor"
    }];

// Run inquirer, pass in questionList variable, use name property,
// githubUsername and favColor. Use fs, writeFilesync to create a PDF.
// WFS replaces a file each time it's edited. Need to make a file for
// the github API JS. Use axios to make a get request from the gh API. 
// Make new variable for username and use inquirer to get the value.
// Make folder w/ 3 files in it. index.js, api.js, htmlgenerator.js - 
// Make function that the electron package can use. Create an html 
// page first (pic on top w/ 4 boxes) then copy and paste the whole 
// skeleton into a function. 


