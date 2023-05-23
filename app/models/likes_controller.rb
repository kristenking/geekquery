class LikesController < ApplicationController
    before_action :set_question

    def toggle_like
        if(@like = @question.likes.find_by(user: current_user))
            @like.destroy
        else
            @question.likes.create(user: current_user)
        end

        respond_to do |format|
            format.turbo_stream do
              render turbo_stream: turbo_stream.replace(
                "question#{@question.id}actions",
                partial: "questions/question_actions",
                locals: {question: @question}
              )
            end
        end
    end

    private
    def set_question
        @question = Question.find(params[:question_id])
    end
end