class CommentsController < ApplicationController
    before_action :set_question, only: [:create]
  def create
    @comment = @question.comments.create(user: current_user, body: params[:comment_body])
  end

  def destroy
    @comment = Comment.find(params[:id])
    if(current_user == @comment.user)
      @comment.destroy
    end
  end


  private
    def set_question
      @question = Question.find(params[:question_id])
    end
end
