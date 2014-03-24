function Round(categoryList){
  // if (category === undefined) {
  //   throw "No category error.";
  // }
  this.letter = "";
  this.categoryList = categoryList;
  this.timeLeft = 6;
  this.answers = [];
  this.answersObject = {};
  this.scores = [];
  this.scoresObject = {};
  this.finalScore = 0;
  this.timerStarted = false;
}


Round.prototype.setRoundLetter = function(letter){
  if (this.letter === "") {
    this.letter = letter;
  } else {
    throw "Letter already set.";
  }
};

Round.prototype.startTimer = function(){
  if (this.letter === "") {
    throw "First you need a letter to play.";
  } else if (this.timerStarted === true) {
    throw "The timer has already been started.";
  } else {
    this.timerStarted = true;
    var tick = function(){
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(intervalId);
        // this.timeUp();
      }
      console.log(this);

    };
    tick = tick.bind(this);
    var intervalId = setInterval(tick, 1000);
  }
};

Round.prototype.submitAnswer = function(answerNumber, answerText) {
  this.answers[answerNumber] = answerText;
};

Round.prototype.autoRejectAnswer = function(answerNumber, answerText) {
  if (answerText === "" || answerText === undefined) {
    this.scores[answerNumber] = 0;
  } else if (answerText[0].toLowerCase() !== this.letter) {
    this.scores[answerNumber] = 0;
  } else {
    this.scores[answerNumber] = 1;
  }
};

// Let the player score an answer as 0 or 1
Round.prototype.scoreAnswer = function(answerNumber, score) {
  if (score === 0 || score === 1) {
    this.scores[answerNumber] = score;
  }
};

// Sum up the scores of individual answers to get the player's final score for the round
Round.prototype.sumFinalScore = function() {
  for(var i = 0; i < 12; i++) {
    this.finalScore += this.scores[i];
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

// $.ajax({
  //   dataType: "json",
  //   url: "auto_reject",
  //   data: {answers: this.answersObject, id: window.location.pathname.replace("/rounds/", "")},
  //   success: function(success) {
  //     console.log(success);
  //     for (var j = 0; j < 12; j++) {
  //       round.scores[j] = success["scores"][j];
  //     }
  //     round.usersJudgeAnswers();
  //     round.updateRejectedStyles();
  //     round.finishScoring();
  //     // rejectBadAnswers();
  //   }
  // });


// Round.prototype.render = function(){
//   // grab an element on the DOM
//   // create all of the elements for the round
//   // hook these elements on to the DOM via the first element you grabbed
//   $();
// };

// Round.prototype.synchronize = function(){
//  $.ajax();
// };










