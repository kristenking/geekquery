class Api::V1::LikesController < ApplicationController
  before_action :set_question
  before_action :set_like, only: [:toggle_like]

  def toggle_like
    if @like
      @like.destroy
    else
      @like = Like.new(user: current_user, question: @question)
      @like.save
    end

    render json: @question.to_json(include: :likes), status: :ok
  end

  private

  def set_question
    @question = Question.find(params[:question_id])
  end

  def set_like
    @like = @question.likes.find_by(user: current_user)
  end
end
