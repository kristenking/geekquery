class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    if current_user
      render json: current_user, status: :ok
    else
      render json: { error: "No user logged in" }, status: :unauthorized
    end
  end
end
