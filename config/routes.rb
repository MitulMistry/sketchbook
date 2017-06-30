Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  resources :artists, only: [:index, :show, :update] #artist is not a model, just an alias for devise users
  get 'artists/:id/sketches' => 'artists#sketches' #get the sketches of an artist by artist id

  get 'sketches/random_sketches' => 'sketches#random_sketches'
  resources :sketches, only: [:index, :show, :create, :update, :destroy]

  get 'tags/non_empty' => 'tags#non_empty'
  resources :tags, only: [:index, :show, :create, :update, :destroy]
  resources :comments, only: [:create, :update, :destroy]

  root 'home#index'
end
