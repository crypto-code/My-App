class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    if !$logged_in or $user == nil
      redirect_to(root_url)
    end

    if $user != nil
      @tasks = Task.where(:user_id => $user.id).group_by(&:flag)
      @flags = $user.tasks.distinct.pluck(:flag)
    end
  end

  def show
    @task = Task.find(params[:id])
    @time = ""
    if @task[:time] != nil
      @time = @task[:time].strftime("%I:%M")
    end
  end

  def edit
    @task = Task.find(params[:id])
    @time = ""
    if @task[:time] != nil
      @time = @task[:time].strftime("%H:%M")
      @date = @task[:deadline].strftime("%Y-%m-%d")
      @datetime = @date + "T" + @time
      puts @datetime
    else
      @date = @task[:deadline].strftime("%Y-%m-%d")
      @datetime = ""
    end
    puts @datetime
  end

  def update
    @task = Task.find(params[:id])
    if @task.update_attributes(task_params)
      render json: @task
    else
      render json: @task.errors
    end

  end

  private
  def task_params
    params.require(:task).permit(:id, :user_id, :title, :description, :deadline, :time, :flag)
  end
end
