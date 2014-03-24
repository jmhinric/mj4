describe("Round", function(){
  // a letter
  // a score (for the round)
  // answers
  // category lists
  var round;
  var roundCategoryList;

  beforeEach(function() {
    roundCategoryList = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    round = new Round(roundCategoryList);
  });

  describe("#initialize", function(){
    it("creates a new round with a 'category'", function(){
      
      expect(round.categoryList).toBe(roundCategoryList);
    });
    it("throws an error when there is no category", function(){
      expect(function(){round = new Round();}).toThrow("No category error.");
    });
  
  });

  describe("#setRoundLetter", function(){
    it("stores a letter for the round", function(){
      round.setRoundLetter("A");
      expect(round.letter).toBe("A");
    });
    it("can't be called more than once", function() {
      round.setRoundLetter("a");
      expect(function(){round.setRoundLetter("b");}).toThrow("Letter already set.");
    });
  });

  describe("#startTimer",function(){

    beforeEach(function(){
      round.timeLeft = 60;
      jasmine.clock().install();
    });

    afterEach(function(){
      jasmine.clock().uninstall();
    });

    it("can't be called unless a letter has been chosen", function() {
      expect(function(){round.startTimer();}).toThrow("First you need a letter to play.");
    });
    it("decrements timeOut by one second every 1000 milliseconds", function(){
      round.setRoundLetter("a");
      round.startTimer();
      jasmine.clock().tick(3001);
      expect(round.timeLeft).toBe(57);
    });
    xit("stops after 60 seconds", function(){
      round.setRoundLetter("a");
      round.startTimer();
      jasmine.clock().tick(63000);
      expect(round.timeLeft).toBe(0);
    });

    it("can't be called more than once", function() {
      round.setRoundLetter("a");
      round.startTimer();
      expect(round.timerStarted).toBe(true);
      expect(function(){round.startTimer();}).toThrow("The timer has already been started.");
    });

  });

  describe("#submitAnswer", function() {
    
    it("takes answers for category questions", function() {
      round.submitAnswer(0, "anchor");
      expect(round.answers[0]).toBe("anchor");
    });

    it("doesn't take answers if the time is up", function() {
      round.timeLeft = 0;
      round.submitAnswer(5, "bell");
      expect(round.answers[5]).toBe(undefined);
    });

  });

  describe("Scoring answers", function() {
    beforeEach(function(){
      // round.timeLeft = 60;
      // jasmine.clock().install();
      round.setRoundLetter("a");
      // round.startTimer();
      // jasmine.clock().tick(60000);
    });

    // afterEach(function(){
      // jasmine.clock().uninstall();
    // });


    describe("#autoRejectAnswer", function() {
      it("scores an answer as 0 if it is blank", function() {
        round.submitAnswer(0, "");
        round.autoRejectAnswer(0, round.answers[0]);
        expect(round.scores[0]).toBe(0);
      });

      it("scores an answer as 0 if the first letter of the word is not the round's letter", function() {
        round.submitAnswer(0, "maserati");
        round.autoRejectAnswer(0, round.answers[0]);
        expect(round.scores[0]).toBe(0);
      });

      it("scores an answer as 1 if it begins with the round's letter", function() {
        round.submitAnswer(0, "abacus");
        round.autoRejectAnswer(0, round.answers[0]);
        expect(round.scores[0]).toBe(1);
      });

      it("doesn't let capitalization affect scoring", function() {
        round.submitAnswer(0, "Abacus");
        round.autoRejectAnswer(0, round.answers[0]);
        expect(round.scores[0]).toBe(1);
      });
    });

    describe("#scoreAnswer", function() {
      it("scores an answer as 0 or 1", function() {
        round.scores[0] = 1;
        round.scoreAnswer(0,0);
        expect(round.scores[0]).toBe(0);
      });

      it("doesn't score the answer if the score given is not 0 or 1", function() {
        round.scores[0] = 1;
        round.scoreAnswer(0,2);
        expect(round.scores[0]).toBe(1);
      });
    });

    describe("#sumFinalScore", function() {
      it("sums up a player's finals score", function() {
        round.scores = [0,1,1,1,0,0,0,0,0,0,0,1];
        round.sumFinalScore();
        expect(round.finalScore).toBe(4);
      });
    });
  });
  

  
  // // PJ: return to asynch later
  // xdescribe("autoRejectAnswers", function() {
  //   var value, async = new AsyncSpec(this);

  //   async.beforeEach(function(done) {
  //     value = 0;
  //     setTimeout(function() {
  //       value++;
      
  //       done();
  //     }, 500);
  //   });
    
  //   beforeEach(function(done) {
  //     setTimeout(function() {
  //       value = 0;
  //       done();
  //     }, 5000);
  //   });

  //   it("scores empty slots or words that don't start with the round's letter as 0", function() {
  //     // done();
  //     round.setLetter();
  //     round.answersObject = {
  //       0: round.letter,
  //       1: "a",
  //       2: "",
  //       3: round.letter,
  //       4: "",
  //       5: round.letter,
  //       6: "",
  //       7: "a",
  //       8: "",
  //       9: "a",
  //       10: "",
  //       11: "a"
  //     };
  //     round.autoRejectAnswers();
  //     expect(round.scores.length).toEqual(12);
  //     expect(sum(round.scores)).toEqual(3);
  //   });

  // });

  // describe("getAnswers", function() {
  //   it("takes answers from the input fields and saves them in an array", function() {
  //     round.answers = [];
  //     round.getAnswers();
  //     expect(round.answers.length).toBe(12);
  //   });
  // });

  // describe("setFinalScore", function() {
  //   it("finds the end result of which answers should be rejected", function() {
  //     round.
  //     expect(round.)
  //   });
  // });

  // function sum(array) {
  //   var arraySum = 0;
  //   $.each(array, function(index, value) {
  //     arraySum += value;
  //   });
  //   return arraySum;
  // }


});