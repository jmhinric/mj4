describe("Round", function(){
  // a letter
  // a score (for the round)
  // answers
  // category lists

  beforeEach(function() {
    round = new Round();
  });

  // describe("setLetter", function(){
  //   it("stores a letter for the round", function(){
  //     round.setLetter("A");
  //     expect(round.letter).toBe("A");
  //   });
  // });

  describe("autoRejectAnswers", function() {
    it("scores every slot in a playcard", function() {
      round.setLetter();
      round.answersObject = {
        0: "a",
        1: "a",
        2: "",
        3: "",
        4: "a",
        5: "a",
        6: "a",
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

    // it("rejects answers that are blank", function() {
    //   round.autoRejectAnswers();
    //   expect(round.scores.length).toBe(12);

    // });
  });

  describe("getAnswers", function() {
    it("takes answers from the input fields and saves them in an array", function() {
      round.getAnswers();
      expect(round.answers.length).toBe(12);
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