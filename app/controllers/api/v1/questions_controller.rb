class Api::V1::QuestionsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token, only: [:toggle_like]

  def index
    @questions = Question.includes(:likes).all
    render json: @questions.to_json(include: :likes, methods: :image_urls), status: :ok
  end

  def show
    @question = Question.find(params[:id])
    render json: @question.as_json(include: :likes, methods: :image_urls), status: :ok
  end

  def create
    @question = current_user.questions.new(question_params)

    if @question.save
      render json: @question, status: :created
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @question = Question.find(params[:id])

    if @question.update(question_params)
      render json: @question, status: :ok
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    render head: :no_content
  end

  def toggle_like
    @question = Question.find(params[:id])

    if @question.likes.exists?(user: current_user)
      @question.likes.where(user: current_user).destroy_all
    else
      @question.likes.create(user: current_user)
    end

    render json: { status: 'success' }, status: :ok
  end

  private

  def question_params
    params.require(:question).permit(:title, :tag, :user_id, images: [])
  end
end
