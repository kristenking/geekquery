require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    @user = create(:user) 
    sign_in @user
  end

  describe "GET #show" do
    context "when user has a profile picture" do
      before do
        @user.profile_picture.attach(io: File.open('spec/fixtures/test_portrait1.jpg'), filename: 'test_portrait1.jpg', content_type: 'image/jpeg')
      end

      it "returns user data including profile picture URL" do
        get :show
        user_data = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(user_data['id']).to eq(@user.id)
        expect(user_data['username']).to eq(@user.username)
        expect(user_data['email']).to eq(@user.email)
        expect(user_data['profile_picture']).to eq(rails_blob_url(@user.profile_picture))
      end
    end
  end

  describe "PUT #update" do
    context "when user updates profile picture" do
      let(:new_picture) { fixture_file_upload('spec/fixtures/test_portrait2.jpg', 'image/jpeg') }

      it "updates the user profile picture" do
        put :update, params: { user: { profile_picture: new_picture } }

        @user.reload
        expect(response).to have_http_status(:ok)
        expect(@user.profile_picture).to be_attached
      end
    end
  end
end
