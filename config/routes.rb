Scattergories::Application.routes.draw do
  root "games#new"

  resources :games, only: [:show, :create]
  # get "games/:game_number", to: "games#show"
end
