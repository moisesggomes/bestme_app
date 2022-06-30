const date = require("./date.js");
const fs = require("fs");

const questions = [
    "😎 O que aprendi hoje?",
    "👎 O que me deixou aborrecido? E o que eu poderia fazer para melhorar?",
    "😄 O que me deixou feliz hoje?",
    "🤝 Quantas pessoas ajudei hoje?"
];
const answers = [];

let questionIndex = 0;
printQuestion(questionIndex);

process.stdin.on("data", (answer) => {
	addToAnswers(answer);
	printQuestion(++questionIndex);
});

function addToAnswers(answer) {
	answer = answer.toString().trim();
	answers.push(answer);
}

function printQuestion(index) {
	if (isNotLastQuestion(index))
		console.log(questions[index]);
	else
		appendReviewAndExit();
}

function isNotLastQuestion(index) {
	return index < questions.length;
}

function appendReviewAndExit() {
	const appendAndExit = new Promise(appendReview);
	appendAndExit.finally(exit);
}

function appendReview(resolve, reject) {
	const review = writeReview();
	fs.appendFile("./reviews.txt", review, (error) => {
		return error ? console.log(error) : resolve();
	});
}

function writeReview() {
	let review = `\nDia: ${date}\n`;
	for (let i = 0, n = answers.length; i < n; i++)
		review += questions[i] + '\n' + "\u27A9 " + answers[i] + '\n';
	return review;
}

function exit() {
	console.log("Closing app");
	process.exit();
}
