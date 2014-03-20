Scattergories::Application.routes.draw do
  root to: "welcome#index"

  resources :games, only: [:new, :create, :show]
  # get "games/:game_number", to: "games#show"
end
