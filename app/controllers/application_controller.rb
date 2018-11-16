class ApplicationController < ActionController::Base
  before_action :current_user

  def current_user
    @current_user ||= User.find(cookies[:user_id])
  rescue ActiveRecord::RecordNotFound => _e
    @current_user = User.create!
    cookies.permanent[:user_id] = @current_user.id
  end
end
