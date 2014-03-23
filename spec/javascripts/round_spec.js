describe("Round", function(){
  // a letter
  // a score (for the round)
  // answers
  // category lists
  var round;
  var roundCategoryList

  beforeEach(function() {
    roundCategoryList = ["Nicknames","Things in the Sky","Pizza toppings",
                  "Colleges/Universities","Fish","Countries",
                  "Things that have spots","Historical Figures",
                  "Something You're Afraid Of","Terms of Endearment",
                  "Items in This Room","Drugs that are abused"];
    round = new Round(roundCategoryList);
    // round = new Round();
  });

  describe("#initialize", function(){
    it("creates a new round with a 'category'", function(){
      
      expect(round.categoryList).toBe(roundCategoryList);
    });
    xit("throws an error when there is no category", function(){
      expect(function(){round = new Round();}).toThrow("No category error.");
    });
  
  });

  describe("setRoundLetter", function(){
    it("stores a letter for the round", function(){
      round.setRoundLetter("A");
      expect(round.letter).toBe("A");
    });
  });

  describe("#startTimer",function(){
    // var category;
    // var round;

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