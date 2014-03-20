class GamesController < ApplicationController

  def new
    @game = Game.new
  end

  def create
    @game = Game.create
    redirect_to game_path(@game)
  end

  def show

  end
end
