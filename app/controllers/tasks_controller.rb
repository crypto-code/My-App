class TasksController < ApplicationController
  def index
    unless $logged_in
      redirect_to(root_url)
    end
    @tasks = $user.tasks
  end

  def show

  end
end
