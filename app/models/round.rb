class Round < ActiveRecord::Base
  belongs_to :game
  def category_list
    @category_lists = Hash.new
    @category_lists[:list_one] = ["A boy's name", "A river", "An animal", "Things that are cold", "Insects", "TV Shows", "Things that grow", "Fruits", "Things that are black", "School subjects", "Movie Titles", "Musical Instruments"]
    return @category_lists
  end
end