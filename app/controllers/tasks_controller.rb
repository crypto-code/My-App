class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    if !$logged_in or $user == nil
      redirect_to(root_url)
    end

    if $user != nil
      @tasks = Task.where(:user_id => $user.id).order("deadline, time").group_by(&:flag)
      @flags = @tasks.keys
      @alerts = Task.where(:user_id => $user.id).order("deadline, time")
    end
  end

  def show
    if !$logged_in or $user == nil
      redirect_to(root_url)
    end
    if $user != nil
      @task = Task.find(params[:id])
      if @task.user_id != $user.id
        redirect_to(root_url)
      end
      @time = ""
      if @task[:time] != nil
        @time = @task[:time].strftime("%I:%M")
      end
    end
  end

  def edit
    if !$logged_in or $user == nil
      redirect_to(root_url)
    end
    @task = Task.find(params[:id])
    if $user != nil
      if @task.user_id != $user.id
        redirect_to(root_url)
      end
      @time = ""
      if @task[:time] != nil
        @time = @task[:time].strftime("%H:%M")
        @date = @task[:deadline].strftime("%Y-%m-%d")
        @datetime = @date + "T" + @time
      else
        @date = @task[:deadline].strftime("%Y-%m-%d")
        @datetime = ""
      end
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.update_attributes(task_params)
      render json: @task
    else
      render json: @task.errors
    end

  end

  def new
    if !$logged_in or $user == nil
      redirect_to(root_url)
    end
    if $user != nil
      @user_id = $user.id
    end
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors
    end

  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    render json: @task
  end

  private
  def task_params
    params.require(:task).permit(:id, :user_id, :title, :description, :deadline, :time, :flag)
  end
end
