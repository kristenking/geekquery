Rails.application.routes.draw do
  # Ruby on Rails routes
  resources :questions
  devise_for :users
  root 'home#index'

  # API routes
  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index, :show, :create, :update, :destroy] do
        post :toggle_like, on: :member
        resources :comments, only: [:index, :create, :destroy]
      end
      resource :users, only: [:show]
    end
  end

  # Other routes
  post "toggle_like", to: "likes#toggle_like", as: :toggle_like

  resources :comments, only: [:create, :destroy]
end
