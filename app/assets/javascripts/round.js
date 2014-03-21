function Round(){
  this.letter = "";
}

Round.prototype.setLetter = function( letter ){
  this.letter = letter;
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
  var letterSelected = false;
  var answerPoints = [];

  // var categoryLists = {};
  // categoryLists["listOne"] = ["A boy's name", "A river", "An animal", "Things that are cold", "Insects", "TV Shows", "Things that grow", "Fruits", "Things that are black", "School subjects", "Movie Titles", "Musical Instruments"];



  // function createCategories() {
  //   $.each(categoryLists["listOne"], function(index, category) {
  //     $("<li>").text(category).appendTo(".category-names");
  //   });
  // }
  // createCategories();
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

  function timeUp() {
    clearInterval(intervalId);
    $("header").text("Time's Up!!!");
    $(".playcard").attr("disabled", "disabled");
    usersJudgeAnswers();
    rejectBadAnswers();
  }


  var randomLetterButton = $("#die_button");

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


  var buttonPress = $("#die_button");

  randomLetterButton.on("click", function() {
    timer.attr("disabled", false);
    var letter = $.ajax({
      dataType: "json",
      url: "letter",
      success: function(success) {
        $("#roll_result").text(success.letter);
      }
    });

    randomLetterButton.attr("disabled", true);
  });

});