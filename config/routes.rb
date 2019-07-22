Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # , controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/auth/spotify/callback', to: 'users#seed'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :show
end
