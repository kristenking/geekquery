require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  describe 'GET #index' do
    before do
      @user = create(:user)
      @question = create(:question, user: @user)
      @comment = create(:comment, user: @user, question: @question)
      sign_in @user
    end

    it 'returns correct JSON' do
      get :index, params: { question_id: @question.id }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.first['username']).to eq(@user.username)
      expect(parsed_response.first['body']).to eq(@comment.body)
    end
  end
end