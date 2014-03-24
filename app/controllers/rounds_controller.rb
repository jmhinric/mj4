class RoundsController < ApplicationController

  before_action :load_round, only: [:category, :get_letter, :auto_reject, :finalize_answers]


  def new
    @round = Round.new
  end

  def create
    @round = Round.create
    @round.after_initialize
    redirect_to round_path(@round)
  end

  def show
    @round = Round.find(params[:id])
  end

  def get_letter
    @letter = @round.random_letter_die
    render json: {letter: @letter}
  end

  def auto_reject
    @scores = @round.auto_reject(params["answers"])
    render json: {scores: @scores}
  end

  def finalize_answers
    @scores = @round.finalize_answers(params["scores"])
    render json: {scores: @scores}
  end

  def category
    render json: {category_list: @round.pick_category}
  end


  private

  def load_round
    @round = Round.find(params["id"])
  end
end
