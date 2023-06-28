class Api::V1::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_question, only: [:create]

  def index
      @question = Question.find(params[:question_id])
      @comments = @question.comments.map do |comment|
          comment.as_json.merge({ username: comment.user.username })
      end
      render json: @comments
  end

  def create
      @comment = Comment.new(question: @question, user: current_user, body: params[:comment_body])
      if @comment.save
          render json: @comment, status: :ok
      else
          render json: { error: @comment.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def destroy
      @comment = Comment.find(params[:id])
      if current_user == @comment.user
          @comment.destroy
          render json: { status: 'success', message: 'Comment deleted' }, status: :ok
      else
          render json: { status: 'error', message: 'Unauthorized action' }, status: :unauthorized
      end
  end

  private

  def set_question
      @question = Question.find(params[:question_id])
  end
end
