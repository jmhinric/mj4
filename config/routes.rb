Scattergories::Application.routes.draw do
  root "rounds#new"

  get "rounds/letter", to: "rounds#get_letter"

  resources :rounds, only: [:show, :create]
end
