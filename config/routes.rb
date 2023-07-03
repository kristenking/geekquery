Rails.application.routes.draw do

  resources :questions
  devise_for :users
  root 'home#index'

  # Admin routes
  
  get '/admin/dashboard', to: 'admin#dashboard', as: "admin_dashboard"
  post 'admin/ban/:id', to: 'admin#ban_user', as: 'admin_ban_user'
  post 'admin/unban/:id', to: 'admin#unban_user', as: 'admin_unban_user'
  

  # API routes
  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index, :show, :create, :update, :destroy] do
        post :toggle_like, on: :member
        resources :comments, only: [:index, :create, :destroy]
      end
      resource :users, only: [:show, :update]
    end
  end

  # Other routes
  post "toggle_like", to: "likes#toggle_like", as: :toggle_like

  resources :comments, only: [:create, :destroy]
end
