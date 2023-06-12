class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    if current_user
      render json: { id: current_user.id, username: current_user.username, email: current_user.email }, status: :ok
    else
      render json: { error: "No user logged in" }, status: :unauthorized
    end
  end
end
