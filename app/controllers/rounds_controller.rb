class RoundsController < ApplicationController

  before_action :load_round, only: [:get_letter, :auto_reject]


  def new
    @round = Round.new
  end

  def create
    @round = Round.create
    @round.after_initialize
    # binding.pry
    redirect_to round_path(@round)
  end

  def show
    @round = Round.find(params[:id])
    @category_lists = @round.category_list
  end

  def get_letter
    @letter = @round.random_letter_die
    render json: {letter: @letter}
  end

  def auto_reject
    @scores = @round.auto_reject(params["answers"])
    render json: {scores: @scores}
  end


  private

  def load_round
    @round = Round.find(params["id"])
  end
end
