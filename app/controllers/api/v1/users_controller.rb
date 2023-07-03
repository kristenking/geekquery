class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, :set_user

  def show
    if current_user
      user_data = {
        id: current_user.id,
        username: current_user.username,
        email: current_user.email
      }

      user_data[:profile_picture] = rails_blob_url(current_user.profile_picture) if current_user.profile_picture.attached?
      
      render json: user_data, status: :ok
    else
      render json: { error: "No user logged in" }, status: :unauthorized
    end
  end

  def update
    if current_user && @user.update(user_params)
      render json: { status: 'success', data: @user }, status: :ok
    else
      render json: { status: 'error', errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find_by(id: current_user.id)
  end

  def user_params
    params.require(:user).permit(:username, :email, :profile_picture)
  end
end
