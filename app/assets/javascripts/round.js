
function Round(){
  this.letter = "";
  this.answers = [];
  this.answersObject = {};
  this.scores = [];
}

Round.prototype.setLetter = function( ){
  $.ajax({
    dataType: "json",
    url: "letter",
    data: {id: window.location.pathname.replace("/rounds/", "")},
    success: function(success) {
      $("#roll_result").text(success.letter);
      round.letter = success.letter;
    }
  });
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


// Round.prototype.render = function(){
//   // grab an element on the DOM
//   // create all of the elements for the round
//   // hook these elements on to the DOM via the first element you grabbed
//   $();
// };

// Round.prototype.synchronize = function(){
//  $.ajax();
// };










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
    timer.attr("disabled", false);
    randomLetterButton.attr("disabled", true);
    round.setLetter();
    // var letter = $.ajax({
    //   dataType: "json",
    //   url: "letter",
    //   data: {id: window.location.pathname.replace("/rounds/", "")},
    //   success: function(success) {
    //     $("#roll_result").text(success.letter);
    //     round.letter = success.letter;
    //   }
    // });

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
    usersJudgeAnswers();
    rejectBadAnswers();
  }

  function usersJudgeAnswers() {

    for(var i = 1; i < 13; i++) {
      var button = $("<button>").text("Reject");
      button.addClass("reject-button");
      button.attr("id", "reject-" + i);

      var id = "#slot-" + i;
      button.appendTo(id); 
      
      $(button).on("click", function() {
        $(this).toggleClass("rejected-button");
        $(this).siblings().toggleClass("rejected-input");
        updateScore();
      });
    }
    finishScoring();
  }


// Use some logic and code from this function for the Ruby Round class auto_reject method
  function rejectBadAnswers() {
    for(var i = 1; i < 13; i++) {
      var randomLetter = $("#roll_result").text();
      if ( $('#answer-' + i).val() == "" ) {
        $('#reject-' + i).addClass("rejected-button");
        $('#reject-' + i).siblings().addClass("rejected-input");
        $('#reject-' + i).attr("disabled", "disabled");
        answerPoints[i - 1] = 0;
      } else if ( $('#answer-' + i).val().charAt(0).toLowerCase() !== randomLetter ) {
        $('#reject-' + i).addClass("rejected-button");
        $('#reject-' + i).siblings().addClass("rejected-input");
        $('#reject-' + i).attr("disabled", "disabled");
        answerPoints[i - 1] = 0;
      } else {
        answerPoints[i - 1] = 1;
      }

      updateScore();
    }
  }

 

  function updateScore() {
    var rejected = $(".rejected-button").length;
    finalScore = 12 - rejected;

  }

  function finishScoring() {
    var finishButton = $("<button id='submit-scores'>");
    finishButton.addClass("finish-button");
    finishButton.text("Finished Scoring");
    finishButton.one("click", endGame);
    finishButton.appendTo(".score");

  }

  function endGame() {
    $("<h1>").text("Game Over!").appendTo(".score");
    $("<h2>").text("Final Score: " + finalScore).appendTo(".score");
    $(".reject-button").attr("disabled", true);
    $(".finish-button").remove();
    $(".score h3").remove();
  }


  


});