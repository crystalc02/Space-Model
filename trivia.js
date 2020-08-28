/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width, trivia
 */

//Runs once at the beginning
function setup() {
  var googleSheetLink = "https://docs.google.com/spreadsheets/d/1GOIlWoLmU168A3WXIGufTIPkLxptlnDxxfiptsmX0z8/edit?usp=sharing";
  trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome); 

}

//Loops continously for background effects and animations. (p5.js)
function draw() {
  if (trivia.state == "welcome") background("light grey");
  else if (trivia.state == "question") background("lightblue");
  else if (trivia.state == "correct") background("green");
  else if (trivia.state == "incorrect") background("red");
  else if (trivia.state == "thankyou") background("orange");
}

function displayWelcome() {
  $(".screen").hide();
  $("#welcome-screen").show();
}

function displayQuestion() {
  $(".screen").hide();
  $("#question-screen").show();
  $("#correctAnswer").removeClass("highlight");
  $("#feedback").hide();
  trivia.insertQuestionInfo();
  trivia.shuffleAnswers();
}

function displayThankyou() {
  //$(".screen").hide();
  //$("#question-screen").show();
 //trivia.insertQuestionInfo();
  //trivia.shuffleAnswers();
  $(".screen").hide();
  $("#thankyou-screen").show();
  $("#game-results").html(`You got ${trivia.totalCorrect} of ${trivia.totalAnswered} correct.`);
}

function onClickedAnswer(isCorrect) {
  if (isCorrect) $("#feedback").html(`Way to go!`).show();
  else $("#feedback").html(`Better luck next time.`).show();
  $("#correctAnswer").addClass("highlight"); //highlight right answer
  setTimeout(trivia.gotoNextQuestion, 1000); //wait 3 secs...next question
}

function onClickedStart() {
  displayQuestion();
}
