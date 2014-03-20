class Game < ActiveRecord::Base
  has_many :rounds

  def category_list
    @category_lists = Hash.new
    @category_lists[:list_one] = ["A boy's name", "A river", "An animal", "Things that are cold", "Insects", "TV Shows", "Things that grow", "Fruits", "Things that are black", "School subjects", "Movie Titles", "Musical Instruments"]
    return @category_lists
  end

  def self.random_letter_die
    @random_letter = ("a".."z").to_a
    @random_letter.sample
  end
end