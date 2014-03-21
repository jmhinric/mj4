describe("Round", function(){
  // a letter
  // a score (for the round)
  // answers
  // category lists

  describe("setLetter", function(){
    it("stores a letter for the round", function(){
      round = new Round();
      round.setLetter("A");
      expect(round.letter).toBe("A");
    });
  });
});