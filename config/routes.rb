Rails.application.routes.draw do

  resources :questions
  devise_for :users
  root 'home#index'

  # ActiveAdmin routes
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)


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
