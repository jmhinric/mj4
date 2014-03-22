describe("Round", function(){
  // a letter
  // a score (for the round)
  // answers
  // category lists

  beforeEach(function() {
    round = new Round();
  });

  describe("setLetter", function(){
    it("stores a letter for the round", function(){
      round.setLetter();
      expect(round.letter).toBe("A");
    });
  });

  describe("autoRejectAnswers", function() {
    var value, async = new AsyncSpec(this);

    // async.beforeEach(function(done) {
    //   value = 0;
    //   setTimeout(function() {
    //     value++;
      
    //     done();
    //   }, 500);
    // });
    
    // beforeEach(function(done) {
    //   setTimeout(function() {
    //     value = 0;
    //     done();
    //   }, 5000);
    // });

    it("scores empty slots or words that don't start with the round's letter as 0", function() {
      // done();
      round.setLetter();
      round.answersObject = {
        0: round.letter,
        1: "a",
        2: "",
        3: round.letter,
        4: "",
        5: round.letter,
        6: "",
        7: "a",
        8: "",
        9: "a",
        10: "",
        11: "a"
      };
      round.autoRejectAnswers();
      expect(round.scores.length).toEqual(12);
      expect(sum(round.scores)).toEqual(3);
    });

  });

  describe("getAnswers", function() {
    it("takes answers from the input fields and saves them in an array", function() {
      round.answers = [];
      round.getAnswers();
      expect(round.answers.length).toBe(12);
    });
  });

  describe("setFinalScore", function() {
    it("finds the end result of which answers should be rejected", function() {
      round.
      expect(round.)
    });
  });

  function sum(array) {
    var arraySum = 0;
    $.each(array, function(index, value) {
      arraySum += value;
    });
    return arraySum;
  }


});