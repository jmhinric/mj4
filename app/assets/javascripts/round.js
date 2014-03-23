$(document).ready(function () {

  var intervalId;
  var time = 6;
  var score = 12;
  var answerPoints = [];
  round = new Round();

  // var categoryLists = {};
  // categoryLists["listOne"] = ["A boy's name", "A river", "An animal", "Things that are cold", "Insects", "TV Shows", "Things that grow", "Fruits", "Things that are black", "School subjects", "Movie Titles", "Musical Instruments"];



  // function createCategories() {
  //   $.each(categoryLists["listOne"], function(index, category) {
  //     $("<li>").text(category).appendTo(".category-names");
  //   });
  // }
  // createCategories();

  // var buttonPress = $("#die_button");
  
  var randomLetterButton = $("#die_button");
  randomLetterButton.on("click", function() {
    round.setLetter();
  });


  var timer = $(".timer button");
  timer.attr("disabled", true);
  timer.one("click", function() {
    $(".playcard").removeAttr('disabled');
    intervalId = setInterval(countDown, 1000);
  });

  function countDown() {
    time -= 1;
    
    if (time === 0) {
      timer.text(":0" + time);
      timeUp();
    } else if(time < 10) {
      timer.text(":0" + time);
    } else {
      timer.text(":" + time);
    }
  }

  function timeUp() {
    clearInterval(intervalId);
    $("header").text("Time's Up!!!");
    $(".playcard").attr("disabled", "disabled");
    round.getAnswers();
    round.autoRejectAnswers();
  }


// Use some logic and code from this function for the Ruby Round class auto_reject method
  // function rejectBadAnswers() {
  //   for(var i = 1; i < 13; i++) {
  //     var randomLetter = $("#roll_result").text();
  //     if ( $('#answer-' + i).val() == "" ) {
  //       $('#reject-' + i).addClass("rejected-button");
  //       $('#reject-' + i).siblings().addClass("rejected-input");
  //       $('#reject-' + i).attr("disabled", "disabled");
  //       answerPoints[i - 1] = 0;
  //     } else if ( $('#answer-' + i).val().charAt(0).toLowerCase() !== randomLetter ) {
  //       $('#reject-' + i).addClass("rejected-button");
  //       $('#reject-' + i).siblings().addClass("rejected-input");
  //       $('#reject-' + i).attr("disabled", "disabled");
  //       answerPoints[i - 1] = 0;
  //     } else {
  //       answerPoints[i - 1] = 1;
  //     }

  //     updateScore();
  //   }
  // }

 

  // function updateScore() {
  //   var rejected = $(".rejected-button").length;
  //   finalScore = 12 - rejected;

  // }

  


  


});


function Round(category){
  this.letter = "";
  // if (category === undefined) {
  //   throw "No category error.";
  // }
  this.category = category;
  this.timeLeft = 60;
  this.answers = [];
  this.answersObject = {};
  this.scores = [];
  this.scoresObject = {};
  this.finalScore = 0;
}

Round.prototype.startTimer = function(){
  var tick = function(){console.log(this); this.timeLeft--;};
  tick = tick.bind(this);
  setInterval(tick,1000);
};

Round.prototype.setLetter = function( ){
  $.ajax({
    dataType: "json",
    url: "letter",
    data: {id: window.location.pathname.replace("/rounds/", "")},
    success: function(success) {
      $(".timer button").attr("disabled", false);
      $("#die_button").attr("disabled", true);
      $("#roll_result").text(success.letter);
      round.letter = success.letter;
    }
  });
};

// Function to take the User's answers from the input fields and store them in the Round constructor function's answers array
Round.prototype.getAnswers = function() {
  for(var i = 0; i < 12; i++) {
    this.answers.push($('#answer-' + (i+1)).val());
    this.answersObject[i] = $('#answer-' + (i+1)).val();
  }
  console.log(this.answers);
  console.log(this.answersObject);
};


// Function to take the User's answers and:
//    1)  Score blank answers as 0
//    2)  Score answers that don't start with the proper letter as 0
Round.prototype.autoRejectAnswers = function() {
  $.ajax({
    dataType: "json",
    url: "auto_reject",
    data: {answers: this.answersObject, id: window.location.pathname.replace("/rounds/", "")},
    success: function(success) {
      console.log(success);
      for (var j = 0; j < 12; j++) {
        round.scores[j] = success["scores"][j];
      }
      round.usersJudgeAnswers();
      round.updateRejectedStyles();
      round.finishScoring();
      // rejectBadAnswers();
    }
  });
};

Round.prototype.usersJudgeAnswers = function() {

  for(var i = 1; i < 13; i++) {
    var button = $("<button>").text("Reject");
    button.addClass("reject-button");
    button.attr("id", "reject-" + i);

    var id = "#slot-" + i;
    button.appendTo(id);
    
    $(button).on("click", function() {
      $(this).toggleClass("rejected-button");
      $(this).siblings().toggleClass("rejected-input");
      // updateScore();
    });
  }
};


// Add appropriate CSS styles to auto-rejected buttons and inputs before the User voting round
Round.prototype.updateRejectedStyles = function() {
  for (var j = 0; j < 12; j++) {
    var buttonId = "#reject-" + (j+1);
    if(this.scores[j] === 0) {
      $(buttonId).toggleClass("rejected-button");
      $(buttonId).siblings().toggleClass("rejected-input");
    }
  }
};


Round.prototype.finishScoring = function() {
  var finishButton = $("<button id='submit-scores'>");
  finishButton.addClass("finish-button");
  finishButton.text("Finished Scoring");
  finishButton.one("click", this.endGame);
  finishButton.appendTo(".score");

};

Round.prototype.endGame = function() {
  this.getUserVotes();
  this.setFinalScore();
  $("<h1>").text("Game Over!").appendTo(".score");
  $("<h2>").text("Final Score: " + this.finalScore).appendTo(".score");
  $(".reject-button").attr("disabled", true);
  $(".finish-button").remove();
  $(".score h3").remove();
};

// Function to see which answers the user rejected
Round.prototype.getUserVotes = function() {
  for(var i = 0; i < 12; i++) {
    var buttonId = "#reject-" + i;
    if($(buttonId).class === "rejected-button") {
      this.scores[i] = 0;
      this.scoresObject[i] = 0;
    } else {
      this.scores[i] = 1;
      this.scoresObject[i] = 1;
    }
  }
};

Round.prototype.setFinalScore = function() {
  $.ajax({
    dataType: "json",
    url: "auto_reject",
    data: {answers: this.answersObject, id: window.location.pathname.replace("/rounds/", "")},
    success: function(success) {
      console.log(success);
      for (var j = 0; j < 12; j++) {
        round.scores[j] = success["scores"][j];
      }
      // round.usersJudgeAnswers();
      // rejectBadAnswers();
    }
  });
};


// Round.prototype.render = function(){
//   // grab an element on the DOM
//   // create all of the elements for the round
//   // hook these elements on to the DOM via the first element you grabbed
//   $();
// };

// Round.prototype.synchronize = function(){
//  $.ajax();
// };










