class RoundsController < ApplicationController

  def new
    @round = Round.new
  end

  def create
    @round = Round.create
    redirect_to round_path(@round)
  end

  def show
    @round = Round.find(params[:id])
    @category_lists = @round.category_list
  end

  def get_letter
    @letter = Round.random_letter_die
    render json: {letter: @letter}
  end
end
