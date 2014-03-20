class GamesController < ApplicationController

  def new
    @game = Game.create
    redirect_to game_path(@game)
  end

  def show

  end
end
