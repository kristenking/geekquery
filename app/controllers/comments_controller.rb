class CommentsController < ApplicationController
  before_action :set_question, only: [:create]

  def create
    @comment = @question.comments.create(user: current_user, body: params[:comment_body])

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          "question#{@question.id}comments",
          partial: "questions/question_comments",
          locals: { question: @question }
        )
      end
      format.html { redirect_to @question }
      format.json { render json: @comment, status: :ok }
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if current_user == @comment.user
      @comment.destroy
    end
  end

  private

  def set_question
    @question = Question.find(params[:question_id])
  end
end
