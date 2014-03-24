$(document).ready(function(){
  var round;
  getCategory();

  var intervalId;
  // var time = 6;
  // var score = 12;
  // var answerPoints = [];
  timer = $(".timer button"); 
  

  function render() {
    var n = 0;

    // When the game initializes
    if (round.letter === "") {

      // List out all the categories and add inputs
      $.each(round.categoryList, function(index, category) {
        $("<label class='answer-label' id='slot-"+n+"'>"+category+"</label>").appendTo(".playcards");
        $("<input class='playcard' type='text' disabled='disabled' id='answer-"+n+"'>").appendTo("#slot-"+n);
        $("<br>").appendTo(".playcards");
        n++;
      });

      // Timer is disabled until the letter is selected
      timer.attr("disabled", true);

      // 
      $("#die_button").on("click", function() {
        setLetter();
      });

    } else {
      $("#die_button").attr("disabled", true);
    }

    // Letter has been selected but timer hasn't started
    if (round.timerStarted === false) {
      
      console.log("first");
      timer.one("click", function() {
        console.log("second");
        $(".playcard").attr('disabled', false);
        intervalId = setInterval(countDown, 1000);
        // round.startTimer();
      });
    } else {
      console.log("else");
    }

    // The timer has run out
    if (round.timeLeft === 0) {
      timer.attr("disabled", true);
      
      // Stop the timer, show a message, disable inputs
      timeUp();
      
      // Store inputs in the round's answers
      getAnswers();

      // Ajax to auto-score blank answers or ones not starting with the round letter
      autoRejectAnswers();

      // Button for player to submit their answer rejections
      finishScoringButton();
    }
  }
  
  // Ajax to get the round's category
  function getCategory(){
    $.ajax({
      dataType: "json",
      url: "category",
      data: {id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        round = new Round(success.category_list);
        render();
      }
    });
  }

  // Ajax to get the round's letter
  function setLetter() {
    $.ajax({
      dataType: "json",
      url: "letter",
      data: {id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        $(".timer button").attr("disabled", false);
        $("#die_button").attr("disabled", true);
        $("#roll_result").text(success.letter);
        round.setRoundLetter(success.letter);
      }
    });
  }

  // Decrement the timer and display the time
  function countDown() {
    round.timeLeft -= 1;
    console.log(round.timeLeft);
    
    if (round.timeLeft === 0) {
      timer.text(":0" + round.timeLeft);
      render();
    } else if(round.timeLeft < 10) {
      timer.text(":0" + round.timeLeft);
    } else {
      timer.text(":" + round.timeLeft);
    }
  }

  // Stop the timer, display a message, disable the inputs
  function timeUp() {
    clearInterval(intervalId);
    $("header").text("Time's Up!!!");
    $(".playcard").attr("disabled", "disabled");
  }

  // Take the player's answers from the input fields and store them in the round's answers
  function getAnswers() {
    for(var i = 0; i < 12; i++) {
      round.submitAnswer(i, $('#answer-' + i).val());
    }
  }

  // Ajax to auto-reject blank answers and those that don't begin with the round's letter
  function autoRejectAnswers() {
    $.ajax({
      dataType: "json",
      url: "auto_reject",
      data: {answers: round.answers, id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        for (var j = 0; j < 12; j++) {
          // Update the JS model scores
          round.scores[j] = success["scores"][j];
        }
        addRejectButtons();
      }
    });
  }


  // Add reject buttons
  function addRejectButtons() {

    for(var i = 0; i < 12; i++) {

      // Create buttons, add class and id
      var button = $("<button>").text("Reject");
      button.addClass("reject-button");
      button.attr("id", "reject-" + i);
      var id = "#slot-" + i;
      button.appendTo(id);

      // Add CSS for rejected answers
      if(round.scores[i] === 0) {
        $(button).toggleClass("rejected-button");
        $(button).siblings().toggleClass("rejected-input");
      }

      // Add event listener for player rejecting an answer
      $(button).on("click", function() {
        $(this).toggleClass("rejected-button");
        $(this).siblings().toggleClass("rejected-input");
      });
    }
  }

  // Button for player to submit their rejected answers
  function finishScoringButton() {
    var finishButton = $("<button id='submit-scores'>");
    finishButton.addClass("finish-button");
    finishButton.text("Finished Scoring");
    finishButton.one("click", submitFinalScores);
    finishButton.appendTo(".score");
  }

  function submitFinalScores() {
    getUserVotes();
    setFinalScore();
  }

  // Collect scores from the user rejected answers
  function getUserVotes() {
    for(var i = 0; i < 12; i++) {
      var buttonId = "#reject-" + i;
      if($(buttonId).hasClass("rejected-button")) {
        round.scoreAnswer(i,0);
      } else {
        round.scoreAnswer(i,1);
      }
    }
  }

  // Ajax to send scores back to the server
  function setFinalScore() {
    $.ajax({
      dataType: "json",
      url: "finalize",
      data: {scores: round.scores, id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        console.log(success);
        for (var j = 0; j < 12; j++) {
          round.scores[j] = success["scores"][j];
        }
        // Update the final score of the game
        round.sumFinalScore();
        
        // Display the final score with game over message
        endGameMessage();
      }
    });
  }

  function endGameMessage() {
    $("<h1>").text("Game Over!").appendTo(".score");
    $("<h2>").text("Final Score: " + round.finalScore).appendTo(".score");
    $(".reject-button").attr("disabled", true);
    $(".finish-button").remove();
    $(".score h3").remove();
  }

});