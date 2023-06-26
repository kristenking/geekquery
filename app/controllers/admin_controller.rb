class AdminController < ApplicationController
    before_action :authenticate_user!
    before_action :check_admin_role
  
    def dashboard
      @users = User.all
    end
  
    def ban_user
      user = User.find(params[:id])
      user.lock_access!
      redirect_to admin_dashboard_path, notice: "User #{user.email} has been banned."
    end
  
    def unban_user
      user = User.find(params[:id])
      user.unlock_access!
      redirect_to admin_dashboard_path, notice: "User #{user.email} has been unbanned."
    end
  
    private
  
    def check_admin_role
      redirect_to root_path, alert: "Access denied." unless current_user.admin?
    end
  end
  