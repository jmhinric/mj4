class Round < ActiveRecord::Base
  belongs_to :game
  
  def after_initialize
    @scores = []
  end
  

  def random_letter_die
    alphabet = ("a".."z").to_a
    unused_letters = ["q", "u", "v", "x", "y", "z"]
    @random_letter = alphabet - unused_letters
    self.letter(@random_letter.sample)
  end

  def letter(round_letter)
    @letter = round_letter
  end

  def auto_reject(answers)
    self.after_initialize
    (0..11).each do |key|
      if answers[key.to_s] == ""
        self.set_scores(key, 0)
      else
        self.set_scores(key, 1)
      end
    end
    self.scores
  end

  def set_scores(index, score)
    self.scores[index] = score
  end

  def scores
    @scores
  end

  def pick_category
    @pick_category = $redis.smembers("all_categories").sample
    
    return @pick_category
  end

  
end