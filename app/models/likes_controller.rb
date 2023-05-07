class LikesController < ApplicationController
    before_action :set_question
    def toggle_like
        if(@like = @question.likes_find_by(user: current_user))
            @like.destroy
        else
            @question.likes_create(user: current_user)
        end
    end

    private
    def set_question
        @question = Question.find(params[:question_id])
    end
end