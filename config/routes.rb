Rails.application.routes.draw do
  root 'users#albums'
  devise_for :users
  # , controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/auth/spotify/callback', to: 'users#seed'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/albums', to: 'users#albums'

  namespace :api do
    namespace :v1 do
      # resources :setup
      resources :albums, only: [:index, :show, :create, :new]
      resources :songs, only: [:index]
    end
  end
end
