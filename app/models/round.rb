class Round < ActiveRecord::Base
  belongs_to :game

  attr_accessor :letter_set

  after_initialize do |user|
    @scores = []
    alphabet = ("a".."z").to_a
    unused_letters = ["q", "u", "v", "x", "y", "z"]
    @letter_set = alphabet - unused_letters
    @number = 1
    @letter
  end

  def letter
    @letter = $redis.hget(self.id, "letter") || random_letter_die
  end

  def letter=(letter)
    $redis.hset(self.id, "letter", letter)
    @letter = letter
    binding.pry
  end
  
  def random_letter_die
    self.letter = @letter_set.sample
  end

  def auto_reject(player, answers)
    (0..11).each do |index|
      # TODO Record each answer on Redis
      if answers[index].to_s == "" || answers[index].to_s.first.downcase != letter
        self.set_score(index, 0)
      else
        self.set_score(index, 1)
      end
    end
    self.scores
  end

  def finalize_answers(scores)
    # self.after_initialize
    (0..11).each do |index|
      self.set_score(index, scores[index])
    end
    self.scores
  end

  def set_score(index, score)
    # TODO Record each answer's current score on Redis
    self.scores[index] = score
  end

  def scores
    @scores
  end

  def pick_category
    @pick_category = $redis.smembers("all_categories").sample
    
    return $redis.smembers(@pick_category)
  end

  
end