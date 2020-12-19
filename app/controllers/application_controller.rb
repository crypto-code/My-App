class ApplicationController < ActionController::Base
  $logged_in = false
  $user = nil
  before_action :clear_active_record_query_cache

  def clear_active_record_query_cache
    ActiveRecord::Base.connection.clear_query_cache
  end

end
