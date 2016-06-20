class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  #covers most authentication for the website here:
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  
  #----------------
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |user_params| user_params.permit(:username, :email, :password, :password_confirmation) }
    devise_parameter_sanitizer.permit(:account_update) { |user_params| user_params.permit(:username, :email, :password, :password_confirmation) }
  end
end
