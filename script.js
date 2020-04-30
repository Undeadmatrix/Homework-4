var questions = [{
    question: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: 2
}, {
    question: "The condition in an if/else statement is enclosed within _____.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    correctAnswer: 1
}, {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
    correctAnswer: 3
}, {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    correctAnswer: 2
}, {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
    correctAnswer: 3
}];
var leaderboard = [];
var leaderboardGet = localStorage.getItem("scoreboard");
leaderboard = leaderboardGet.split(",");
console.log("get: " + leaderboardGet);
//leaderboard.push(leaderboardGet);
console.log("init array leaderboard: " + leaderboard);

var quizOver = false;
var currentQuestion = 0;
var sec = 75;
var score = 0;

function timer()
{
    if(quizOver === false)
    {
        var timer = setInterval(function(){
            document.getElementById('safeTimerDisplay').innerHTML="Time Left: " +sec;
            sec--;
            if (sec < 0) 
            {
                clearInterval(timer);
                quizOver = true;
            }
        }, 1000);
    }
    else{
        clearInterval(timer);
    }
}

function startQuiz()
{
    console.log(currentQuestion);
    if(currentQuestion < 5)
    {
        $("#introCard").hide();
        $("#questionsCard").show();
        console.log(questions[currentQuestion].question);
        $("#qstart").text(questions[currentQuestion].question);
        $("#lab1").text(questions[currentQuestion].choices[0]);
        $("#lab2").text(questions[currentQuestion].choices[1]);
        $("#lab3").text(questions[currentQuestion].choices[2]);
        $("#lab4").text(questions[currentQuestion].choices[3]);
    }
    else
    {
        endQuiz();
    }
    
}
function endQuiz()
{
    $("#questionsCard").hide();
    $("#safeTimerDisplay").hide();
    $("#results").show();
    quizOver = true;
    score = sec;
    console.log(score);
    $("#finalScore").text("Your final score is: " + score);    
}



function checkAnswer()
{
    var val = $("input[type='radio']:checked").val();

    if (val == undefined) 
    {
        $(document).find("#isCorrect").text("Please select an answer");
    }
    else if(val == questions[currentQuestion].correctAnswer)
    {
        $(document).find("#isCorrect").text("Correct");
        currentQuestion++;
        startQuiz();
    }
    else{
        $(document).find("#isCorrect").text("Incorrect");
        currentQuestion++;
        sec = sec - 10;
        startQuiz();
    }
}
function hideStart()
{
    $("#questionsCard").hide();
    $(".choice1").hide();
    $(".choice2").hide();
    $(".choice3").hide();
    $(".choice4").hide();
    $("#results").hide();
    $("#leaderboard").hide();
    $("#leaderboardTitle").hide();
}
function showLeaderboard()
{
    $("#results").hide();
    $("#leaderboard").show();
    $("#leaderboardTitle").show();

    for(var i = 0; i < leaderboard.length; i++)
    {
        console.log("length: " + leaderboard.length)
        console.log("leaderboard end: " + leaderboard[i]);
        console.log("leaderboard at end: " + leaderboard);
        $("#leaderboard").append("<li>" + leaderboard[i] + "</li>");
    }
    
}
window.onload = hideStart();
$(".btn-primary").on("click", function()
{
    timer();
    startQuiz();
});
$(".btn-secondary").on("click", function()
{
    checkAnswer();
});
$("#submit").on("click", function()
{
    var userName = $("#userName").val();
    var leaderboardVal = score + ": " + userName;
    leaderboard.push(leaderboardVal);
    localStorage.setItem("scoreboard", leaderboard);
    leaderboard.sort(function(a, b){return b-a});
    console.log("sorted leaderboard: " + leaderboard);
    showLeaderboard();
    console.log(leaderboard);
    console.log(userName);
});
window.addEventListener("storage", function(e) {
    console.debug(e);
 }, false);