class Round < ActiveRecord::Base
  belongs_to :game

  attr_accessor :letter_set

  after_initialize do |user|
    alphabet = ("a".."z").to_a
    unused_letters = ["q", "u", "v", "x", "y", "z"]
    @letter_set = alphabet - unused_letters
    @number = 1
    @letter
    @number_of_players = 2
    @answers = [ [], [] ]
    @scores = [ [], [] ]
  end

  def letter
    @letter = $redis.hget(self.id, "letter") || random_letter_die
  end

  def letter=(letter)
    $redis.hset(self.id, "letter", letter)
    @letter = letter
    # binding.pry
  end
  
  def random_letter_die
    self.letter = @letter_set.sample
  end

  def auto_reject(player, answers)
    (0..11).each do |index|
      if answers[index].to_s == "" || answers[index].to_s.first.downcase != letter
        $redis.HSET(self.id, "player#{player}::score#{index}", 0)
      else
        $redis.HSET(self.id, "player#{player}::score#{index}", 1)
      end

      $redis.HSET(self.id, "player#{player}::answer#{index}", answers[index])
    end
  end

  def number_of_players
    return @number_of_players
  end

  def all_player_answers
    (0...self.number_of_players).each do |player_number|
      (0..11).each do |answer_number|
        @answers[player_number][answer_number] = ($redis.hget(self.id, "player#{player_number}::answer#{answer_number}"))
      end
    end
    return @answers
  end

  def all_player_scores
    (0...self.number_of_players).each do |player_number|
      (0..11).each do |score_number|
        @scores[player_number][score_number] = ($redis.hget(self.id, "player#{player_number}::score#{score_number}"))
      end
    end
    return @scores
  end

  def finalize_answers(scores)
    ("0".."1").each do |player|
      (0..11).each do |index|
        if answers[player][index] == 0
          $redis.HSET(self.id, "player#{player}::score#{index}", 0)
        else
          $redis.HSET(self.id, "player#{player}::score#{index}", 1)
        end
      end
    end
    return @scores
  end

  # def set_score(index, score)
    # TODO Record each answer's current score on Redis
    # self.scores[index] = score
  # end

  def scores
    @scores
  end

  def pick_category
    @pick_category = $redis.smembers("all_categories").sample
    $redis.HSET(self.id, "category", @pick_category)
    return $redis.smembers(@pick_category)
  end

  
end