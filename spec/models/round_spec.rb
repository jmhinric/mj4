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
    round.auto_reject(0, [""]);
    expect(round.scores[0]).to eq(0);
  end

  it "scores an answer as 0 if the first letter of the word is not the round's letter" do
    round.letter = "a"
    round.auto_reject(0, ["maserati"]);
    expect(round.scores[0]).to eq(0);
  end

  it "scores an answer as 1 if it begins with the round's letter" do
    round.letter = "a"
    round.auto_reject(0, ["abacus"]);
    expect(round.scores[0]).to eq(1);
  end

  it "doesn't let capitalization affect scoring" do
    round.letter = "a"
    round.auto_reject(0, ["Abacus"]);
    expect(round.scores[0]).to eq(1);
  end
end

describe "#all_player_answers" do 
  let(:round) { Round.create }
  it "collects all player answers" do
    round.pick_category
    round.letter = "a"

    answers_first = ["Apple", "abacus", "", "bear", "Monkey", "austin", "adam", "", "arithmetic", "atlanta", "allegory", "" ]
    answers_second = ["", "algebra", "plum", "umbrella", "jacket", "aunt", "ant", "aussie", "", "top", "apple", "eskimo"]

    round.auto_reject(0, answers_first)
    round.auto_reject(1, answers_second)
    expect(round.all_player_answers).to eq([answers_first, answers_second])
  end
end