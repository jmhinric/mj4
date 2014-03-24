require 'spec_helper'

describe "#random_letter_die" do
  let(:round) { Round.create }

  it "returns the round's letter" do
    round.random_letter_die
    expect(round.letter).not_to be_nil
  end
end

describe "#auto_reject" do
  let(:round) { Round.create }


  it "scores an answer as 0 if it is blank" do
    round.letter = "a"
    round.auto_reject([""]);
    expect(round.scores[0]).to eq(0);
  end

  it "scores an answer as 0 if the first letter of the word is not the round's letter" do
    round.letter = "a"
    round.auto_reject(["maserati"]);
    expect(round.scores[0]).to eq(0);
  end

  it "scores an answer as 1 if it begins with the round's letter" do
    round.letter = "a"
    round.auto_reject(["abacus"]);
    expect(round.scores[0]).to eq(1);
  end

  it "doesn't let capitalization affect scoring" do
    round.letter = "a"
    round.auto_reject(["Abacus"]);
    expect(round.scores[0]).to eq(1);
  end
end