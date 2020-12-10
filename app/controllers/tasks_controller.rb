class TasksController < ApplicationController
  def index
    unless $logged_in
      redirect_to(root_url)
    end
    @tasks = $user.tasks
    @flag = $user.tasks.group_by{|t| t.flag}
  end

  def show

  end
end
