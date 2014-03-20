class GamesController < ApplicationController

  def create
    @game = Game.create
    redirect_to game_path(@game)
  end

  def show
    @game = Game.find_by_id(params[:id])
    @category_lists = @game.round.category_list[:list_one]
  end
end
