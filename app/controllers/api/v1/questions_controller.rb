class Api::V1::QuestionsController < ApplicationController
    protect_from_forgery with: :null_session
  
    def index
      @questions = Question.all
      render json: @questions, status: :ok
    end
  
    def show
      @question = Question.find(params[:id])
      render json: @question, status: :ok
    end
  
    def create
      @question = current_user.questions.new(question_params)
  
      if @question.save
        render json: { data: @question, status: 'success' }, status: :ok
      else
        render json: { data: @question.errors.full_messages, status: 'failure' }, status: :unprocessable_entity
      end
    end
  
    def update
      @question = Question.find(params[:id])
  
      if @question.update(question_params)
        render json: { data: @question, status: 'success' }, status: :ok
      else
        render json: { data: @question.errors.full_messages, status: 'failure' }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @question = Question.find(params[:id])
      @question.destroy
      render json: { status: 'success' }, status: :ok
    end
  
    private
  
    def question_params
      params.require(:question).permit(:title, :tag, :user_id, images: [])
    end
  end
  