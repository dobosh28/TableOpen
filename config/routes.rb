Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:show, :create, :update]
    resources :restaurants, only: [:index, :show]
    resources :reservations, only: [:index, :show, :create, :update, :destroy]
    resources :reviews, only: [:index, :show, :create, :update, :destroy]
    resources :favorites, only: [:index, :show, :create, :destroy]
  end

  get '*path', to: 'static_pages#frontend_index'
end
