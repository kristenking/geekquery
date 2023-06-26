class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  add_flash_types :success, :info, :warning, :danger
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end

  def after_sign_in_path_for(resource)
  if resource.admin?
    admin_dashboard_path 
  else
    questions_path
  end
end
end
