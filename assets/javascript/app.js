var counter = 10;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var interval;

var question = quizQuestions[currentQuestion].question;
var choices = quizQuestions[currentQuestion].choices;

$( document ).ready(function() {

  $(document).on("click", ".choice", function() {
    var userAnswer = $(this).attr("data-answer");
    if(userAnswer === quizQuestions[currentQuestion].correctAnswer){
      score++;
      clearInterval(interval); 
    }else {
      lost++;
      clearInterval(interval);
    }
    currentQuestion++;
    question = quizQuestions[currentQuestion].question;
    choices = quizQuestions[currentQuestion].choices;
    loadQuestion();
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
  
  if ((quizQuestions.length-1) === currentQuestion){
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
    question = quizQuestions[currentQuestion].question;
    choices = quizQuestions[currentQuestion].choices;
    clearInterval(interval);
    loadQuestion();
  }
}

function displayResult(){
  clearInterval(interval);
  $("#timer").empty();
  $("#game").empty();
  $("#options").empty();
  $("#game").text( "You got " + score + " questions correct");
  $("#options").text( "You got " + lost + " questions incorrect");  
}

$("#reset").click(function(){
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