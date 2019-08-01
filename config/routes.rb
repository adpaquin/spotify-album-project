Rails.application.routes.draw do
  root 'albums#index'
  devise_for :users
  # , controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/auth/spotify/callback', to: 'sessions#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :albums, only: [:index, :show, :create, :new]

  namespace :api do
    namespace :v1 do
      resources :albums, only: [:index, :show, :create]
    end
  end
end
