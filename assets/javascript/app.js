var counter = 5;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var interval;

var question = quizQuestions[currentQuestion].question;
var choices = quizQuestions[currentQuestion].choices;

$(document).ready(function () {

  const quizQuestions = [
    {
      question: "which team won the last world cup?",
      choices: ["Brazil", "France", "Germany", "Spain"],
      correctAnswer: "France"
    },

    {
      question: "How many times did this team win the world cup?",
      choices: ["1", "2", "3", "4"],
      correctAnswer: "2"
    },

    {
      question: "who won the first world cup?",
      choices: ["Mexico", "Spain", "Uruguay", "Brazil"],
      correctAnswer: "Uruguay"
    },

    {
      question: "when was the first world cup?",
      choices: ["1930", "1934", "1940", "1944"],
      correctAnswer: "1930"
    },

    {
      question: "when was the first world cup?",
      choices: ["1930", "1934", "1940", "1944"],
      correctAnswer: "1930"
    },

  ];

  $(document).on("click", ".choice", function () {
    var userAnswer = $(this).attr("data-answer");
    if (userAnswer === quizQuestions[currentQuestion].correctAnswer) {
      score++;
      clearInterval(interval);
    } else {
      lost++;
      clearInterval(interval);
    }
    currentQuestion++;
    if(currentQuestion<=quizQuestions.length-1){
      question = quizQuestions[currentQuestion].question;
      console.log(question)
      choices = quizQuestions[currentQuestion].choices;
      loadQuestion();
    }
    
    
  })

  loadQuestion();
});

function loadQuestion() {
  $("#game").empty();
  $("#options").empty();
  $("#timer").html("Time Remaining: " + counter);
  $("#game").html("<h4>" + question + "</h4>");

  for (var i = 0; i < choices.length; i++) {
    var btn = $("<button>")
    btn.addClass("choice")
    btn.attr("data-answer", choices[i])
    btn.text(choices[i])
    $("#options").append(btn);
    $("#options").append("<br><br>")
  }
  counter = 10;
  interval = setInterval(countdown, 1000)

  if ((quizQuestions.length) === currentQuestion) {
    displayResult();
  }
}
//timer function
function countdown() {
  counter--
  $("#timer").html("Time Remaining: " + counter);
  if (counter === 0) {
    lost++;
    currentQuestion++;
    if(currentQuestion<=quizQuestions.length-1){
    question = quizQuestions[currentQuestion].question;
    console.log(question)
    choices = quizQuestions[currentQuestion].choices;
    clearInterval(interval);
    loadQuestion();
    }
    
    
  }
}

$("#reset").click(function () {
  counter = 10;
  currentQuestion = 0;
  score = 0;
  lost = 0;
  interval;

  question = quizQuestions[currentQuestion].question;
  choices = quizQuestions[currentQuestion].choices;
  clearInterval(interval);
  loadQuestion();
});
function displayResult() {
  clearInterval(interval);
  $("#timer").empty();
  $("#game").empty();
  $("#options").empty();
  $("#game").text("You got " + score + " questions correct");
  $("#options").text("You got " + lost + " questions incorrect");
}