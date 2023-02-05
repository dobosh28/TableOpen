Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'api/application#test'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :show, :destroy]
    resources :users, only: [:create, :show, :update, :destroy]
  end
end
