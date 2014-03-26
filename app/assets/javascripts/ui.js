$(document).ready(function(){
  var round;
  getCategory();


  var intervalId;
  // var time = 6;
  // var score = 12;
  // var answerPoints = [];
  timer = $(".timer button");
  header = $("header");
  

  function render() {
    if (round.allAnswersEntered) {
      $(".playcards").empty();
      renderJudging();
      finishScoringButton();
    }

    // When the game initializes
    else if (round.letter === "") {
      renderPlaycard();
      
      // Timer is disabled until the letter is selected
      timer.attr("disabled", true);

      // Event listener for getting the round letter
      $("#die_button").on("click", function() {
        setLetter();
      });

      timerListener();

    // First player has entered answers, second player needs to play
    //Reset DOM & playcard for Player 1
    } else {
      timer.text("Start Timer!");
      $("#time-up-message").text("Player 2's Turn!");
      round.timeLeft = 10;
      round.timerStarted = false;
      timerListener();
      renderPlaycard();
    }

  }

  function renderJudging() {
    for(var playerCounter = 0; playerCounter < round.numberOfPlayers; playerCounter ++){
      $.each(round.categoryList, function(index, category) {

        // Create and append HTML label
        if (playerCounter === 0 ) {
          $("<label class='answer-label' id='slot-"+playerCounter+"-"+index+"'>"+category+"</label>").appendTo(".playcards");
        } else {
          $("<label class='answer-label' id='slot-"+playerCounter+"-"+index+"'></label>").appendTo(".playcards");
        }
        
        // Create input fields with event listeners
        var input = $("<input class='playcard' type='text' disabled='disabled' id='answer-"+playerCounter+"-"+index+"'>");
        input.val(round.answers[playerCounter][index]);

        input.appendTo("#slot-"+playerCounter+"-"+index);
        $("<br>").appendTo(".playcards");
        addRejectButtons(playerCounter, index);
      });
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

  function renderPlaycard() {
    // List out all the categories and add inputs
    var n = 0;
    $.each(round.categoryList, function(index, category) {
      
      // Create and append HTML label
      $("<label class='answer-label' id='slot-"+n+"'>"+category+"</label>").appendTo(".playcards");
      
      // Create input fields with event listeners
      var input = $("<input class='playcard' type='text' disabled='disabled' id='answer-"+n+"'>");
      input.text("");
      
      // Event listener to record answers as they're typed
      input.on("keyup", function(e) {
        round.submitAnswer(round.player, e.target.id.replace("answer-", ""), input.val());
      });

       $("#slot-"+n).after(input);
      // input.appendTo("#slot-"+n);
      // $("<br>").appendTo(".playcards");
      n++;
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

  function timerListener() {  
    timer.one("click", function() {
      $(".playcard").attr('disabled', false);
      intervalId = setInterval(countDown, 1000);
      // round.startTimer();
    });
  }

  // Decrement the timer and display the time
  function countDown() {
    round.timeLeft -= 1;
    console.log(round.timeLeft);
    
    if (round.timeLeft === 0 && round.player < (round.numberOfPlayers - 1)) {
      
      timer.text(":0" + round.timeLeft);
      timeUp();
      autoRejectAnswers();
    } else if (round.timeLeft === 0) {
        timer.text(":0" + round.timeLeft);
        timeUp();
        autoRejectAnswers();
        console.log("Successful gameplay");
    } else if(round.timeLeft < 10) {
      timer.text(":0" + round.timeLeft);
    } else {
      timer.text(":" + round.timeLeft);
    }
  }

  // Stop the timer, display a message, disable the inputs
  function timeUp() {
    clearInterval(intervalId);
    $(header).after("<h2 id='time-up-message'>Time's Up!!</h2>");
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
      url: window.location.pathname.replace("/rounds/", "") + "/auto_reject",
      data: {answers: round.answers, player: round.player},
      success: function(success) {
        console.log(success);
        for (var z = 0; z < round.numberOfPlayers; z++) {
          for (var j = 0; j < 12; j++) {
            // Update the JS model scores
            round.scores[z][j] = success["scores"][z][j];
            round.answers[z][j] = success["answers"][z][j];
          }
        }
        if (round.player < (round.numberOfPlayers - 1)) { 
          round.player++;
          $(".playcards").empty();
          render();
        }
        else { 
          round.allAnswersEntered = true;
          $("#time-up-message").remove();
          render();
        }
      }
    });
  }

  // Add reject buttons
  function addRejectButtons(playerCounter, n) {

      // for(var i = 0; i < 12; i++) {

        // Create buttons, add class and id
        var button = $("<button>").text("Reject");
        button.addClass("reject-button");
        button.attr("id", "reject-" + playerCounter + "-" + n);
        var id = "#slot-"+playerCounter+"-"+n;
        button.appendTo(id);
        // $("#answer-'+playerCounter+'-'+n+'").after(button);

        // Add CSS for rejected answers
        if(round.scores[playerCounter][n] === "0") {
          $(button).toggleClass("rejected-button");
          $(button).attr("disabled", "disabled");
          $(button).siblings().toggleClass("rejected-input");
        }

        // Add event listener for player rejecting an answer
        $(button).on("click", function() {
          $(this).toggleClass("rejected-button");
          $(this).siblings().toggleClass("rejected-input");
        });
      // }
  }

  // Button for player to submit their rejected answers
  function finishScoringButton() {
    var finishButton = $("<button id='submit-scores'>");
    finishButton.addClass("finish-button");
    finishButton.text("Finished Scoring");
    finishButton.one("click", submitFinalScores);
    $(".playcards").append(finishButton);
  }

  function submitFinalScores() {
    getUserVotes();
    round.sumFinalScore();
    endGameMessage();
  }

  // Collect scores from the user rejected answers
  function getUserVotes() {
    for(var p = 0; p < round.numberOfPlayers; p++) {
      for(var i = 0; i < 12; i++) {
        var buttonId = "#reject-" + p + "-" + i;
        if($(buttonId).hasClass("rejected-button")) {
          round.scoreAnswer(p, i, 0);
        } else {
          round.scoreAnswer(p, i, 1);
        }
      }
    }
  }

  function endGameMessage() {
    endGameDisplay();
    var endDiv = $("<div>").attr("id", "game-over");

    $("<h1>").text("Game Over!").appendTo(endDiv);
    $("<h2>").text("Final Score:").appendTo(endDiv);
    $("<h3>").text("Player 1: " + round.finalScore[0]).appendTo(endDiv);
    $("<h3>").text("Player 2: " + round.finalScore[1]).appendTo(endDiv);

    var winner = $("<h2>");
    if (round.finalScore[0] > round.finalScore[1]) {
      winner.text("Player 1 Wins!");
    } else if (round.finalScore[0] < round.finalScore[1]) {
      winner.text("Player 2 Wins!");
    } else {
      winner.text("Tie Game!");
    }
    winner.appendTo(endDiv);
    $(".playcards").after(endDiv);
    
  }

  function endGameDisplay() {
    $(".reject-button").attr("disabled", true);
    $(".finish-button").remove();
    $(".score h3").remove();
  }

  // Ajax to send scores back to the server
  // function setFinalScore() {
  //   $.ajax({
  //     dataType: "json",
  //     url: window.location.pathname.replace("/rounds/", "") + "/finalize",
  //     data: { scores: round.scores },
  //     success: function(success) {
  //       console.log("Final scores received!");
  //       for (var j = 0; j < 12; j++) {
  //         round.scores[j] = success["scores"][j];
  //       }
  //       // Update the final score of the game
  //       round.sumFinalScore();
        
  //       // Display the final score with game over message
  //       endGameMessage();
  //     }
  //   });
  // }

});