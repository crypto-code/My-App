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

  def create
    @error = $error_msg
    if @error != ""
      render("create.html.erb", anchor: "login")
    else
      render("create.html.erb")
    end
    $error_msg = ""
  end

  def new
    @username = params[:"user"]
    @password = params[:"pass"]
    @confirm = params[:"confirm-pass"]
    if @confirm != @password
      $error_msg = "Passwords Don't Match"
      redirect_to(controller: :welcome, action: :create)
    elsif @username.length < 5
      $error_msg = "Username must be minimum 5 characters"
      redirect_to(controller: :welcome, action: :create)
    elsif @password.length < 8
      $error_msg = "Password must be minimum 8 characters"
      redirect_to(controller: :welcome, action: :create)
    else
      @user = User.new(username: @username, password: @password)
      if @user.save
        $user = User.find_by username: @username, password: @password
        $error_msg = ""
        $logged_in = true
        redirect_to(controller: :tasks, action: :index)
      else
        $error_msg = "User Creation Error"
        redirect_to(controller: :welcome, action: :create)
      end
    end
  end
end
