class GamesController < ApplicationController

  def new
    @game = Game.new
  end

  def create
    @game = Game.create
    redirect_to game_path(@game)
  end

  def show
    @game = Game.find_by_id(params[:id])
    @category_lists = @game.category_list[:list_one]
  end

  def get_letter
    @letter = Game.random_letter_die
    render json: {letter: @letter}
  end
end
