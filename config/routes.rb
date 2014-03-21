Scattergories::Application.routes.draw do
  root "games#new"

  get "games/letter", to: "games#get_letter"

  resources :games, only: [:show, :create]

  # get "games/:game_number", to: "games#show"
end
