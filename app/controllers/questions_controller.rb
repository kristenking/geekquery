class QuestionsController < ApplicationController
  before_action :set_question, only: %i[ show edit update destroy ]

  # GET /questions or /questions.json
  def index
    @questions = Question.all
    flash.now[:notice] = "This is a flash message"
  end

  # GET /questions/1 or /questions/1.json
  def show
  end

  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/1/edit
  def edit
  end

  # POST /questions or /questions.json
  def create
    @question = current_user.questions.new(question_params)

    if @question.save
      redirect_to questions_path
    else
      render :new
    end

    # respond_to do |format|
    #   if @question.save
    #     format.html { redirect_to question_url(@question), notice: "Question was successfully created." }
    #     format.json { render :show, status: :created, location: @question }
    #   else
    #     format.html { redirect_to root_path, status: :unprocessable_entity, alert: @question.errors.full_messages }
    #     format.json { render json: @question.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /questions/1 or /questions/1.json
  def update
    respond_to do |format|
      if @question.update(question_params)
        format.html { redirect_to question_url(@question), notice: "Question was successfully updated." }
        format.json { render :show, status: :ok, location: @question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /questions/1 or /questions/1.json
  def destroy
    @question.destroy

    respond_to do |format|
      format.html { redirect_to questions_url, notice: "Question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def question_params
      params.require(:question).permit(:title, :tag, :user_id, images: [])
    end
end
