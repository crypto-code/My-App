class WelcomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  $error_msg = ""
  def index
    @error = $error_msg
    if $logged_in and $user != nil
      redirect_to(controller: :tasks, action: :index)
    else
      render("index.html.erb")
    end
    $error_msg = ""
  end

  def login
    @username = params[:"user"]
    @password = params[:"pass"]
    $user = User.find_by username: @username, password: @password
    if $user == nil
      $error_msg = "Invalid Username or Password"
      redirect_to root_url(anchor: 'login')
    else
      $error_msg = ""
      $logged_in = true
      redirect_to(controller: :tasks, action: :index)
    end
  end

  def logout
    $logged_in = false
    redirect_to(root_url)
  end
end
