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

// Player scores an answer as 0 or 1
Round.prototype.scoreAnswer = function(answerNumber, score) {
  if (score === 0 || score === 1) {
    this.scores[answerNumber] = score;
  }
};

// Sum up the scores of individual answers to get the player's final score for the round
Round.prototype.sumFinalScore = function() {
  for(var i = 0; i < 12; i++) {
    this.finalScore += parseInt(this.scores[i]);
  }
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










