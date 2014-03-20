Scattergories::Application.routes.draw do
  root to: "welcome#index"

  resources :games
end
