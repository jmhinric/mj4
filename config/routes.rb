Scattergories::Application.routes.draw do
  root "rounds#new"

  get "rounds/category", to: "rounds#category"

  get "rounds/letter", to: "rounds#get_letter"

  get "rounds/auto_reject", to: "rounds#auto_reject"

  get "rounds/finalize", to: "rounds#finalize_answers"

  resources :rounds, only: [:show, :create]
end
