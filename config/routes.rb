Rails.application.routes.draw do
  resources :questions
  devise_for :users
  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/questions', to:'home#index', via: :all
  # Defines the root path route ("/")
  # root "articles#index"
end
