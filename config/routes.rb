Rails.application.routes.draw do
  get 'welcome/index'
  post 'welcome/login'
  get 'welcome/logged'
  get 'welcome/logout'
  get 'welcome/create'
  post 'welcome/new'

  resources :tasks


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'welcome#index'
end
