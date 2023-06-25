class Api::V1::CommentsController < ApplicationController
    before_action :set_question, only: [:create]

    def create
        @comment = @question.comments.create(user: current_user, body: params[:comment_body])
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