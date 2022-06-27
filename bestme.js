const date = require("./date.js");
const fs = require("fs");

const questions = [
    "😎 " + "O que aprendi hoje?",
    "👎 " + "O que me deixou aborrecido? E o que eu poderia fazer para melhorar?",
    "😄 " + "O que me deixou feliz hoje?",
    "🤝 " + "Quantas pessoas ajudei hoje?"
];
const answers = [];
const questionsLength = questions.length;

let review = "";

let index = 0;
function ask(index) {
    console.log(questions[index]);
}
ask(index);

process.stdin.on("data", (data) => {
    let answer = data.toString().trim();
    answers.push(answer);
    const answersLength = answers.length;

    if (answersLength < questionsLength) {
        ask(++index);
    } else {
        review += `Dia: ${date}\n\n`;
        for (let i = 0; i < answersLength; i++) {
            review += questions[i] + '\n';
            if (i === answersLength - 1) {
                review += "\u27A9 " + answers[i] + "\n\n\n";
            } else {
                review += "\u27A9 " + answers[i] + '\n';
            }
        }
        const appendAndExitApp = new Promise(appendReview);
        appendAndExitApp.finally(exitApp);
    }
});

function appendReview(resolve, reject) {
    fs.appendFile("./reviews.txt", review, error => error ? console.log(error) : resolve())
}
function exitApp() {
    console.log("Closing app");
    process.exit(0);
}