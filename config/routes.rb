Rails.application.routes.draw do
  devise_for :users, :controllers => { :sessions => 'users/sessions' }
  namespace :api do 
    namespace :v1 do 
      resources :documentaries, param: :slug
      resources :books, param: :slug
      end
    end
 
    root to: 'homepage#index'
    get '/*path' => 'homepage#index', via: :all
end
