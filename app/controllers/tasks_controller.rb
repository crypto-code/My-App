class TasksController < ApplicationController
  def index
    if !$logged_in or $user == nil
      redirect_to(root_url)
    else
      @tasks = $user.tasks.group_by{|t| t.flag}
      @flags = $user.tasks.distinct.pluck(:flag)
    end
  end

  def show
    @task = Task.find(params[:id])
    @time = ""
    if @task[:time] != nil
      @time = @task[:time].strftime("%I:%M %p")
    end
    puts
  end
end
