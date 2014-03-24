Scattergories::Application.routes.draw do
  root "rounds#new"

  get "rounds/category", to: "rounds#category"

  get "rounds/letter", to: "rounds#get_letter"

  get "rounds/auto_reject", to: "rounds#auto_reject"

  get "rounds/finalize", to: "rounds#finalize_answers"

  resources :rounds, only: [:show, :create]
  
  # resources :games, shallow: true do
  #   resources :players, only: [:create]
  #   resources :rounds, only: [:show, :create] do
  #     resources :players, except: [:new,:create]
  #   end
  # end

end
