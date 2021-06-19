
var buttonColors = ["green", "red", "blue", "yellow"];
var gamePattern =[];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keydown(function(){
  if(!start){
    $("level-title").text("Level" + level);
    nextSequence();
    start = true;
  }
})

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);

}
function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();

}
function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence()}, 1000);
    }
  }
  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}
