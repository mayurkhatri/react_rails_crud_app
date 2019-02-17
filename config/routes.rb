Rails.application.routes.draw do
  root to: redirect('/events')

  get 'events', to: 'sites#index'
  get 'events/new', to: 'sites#index'
  get 'events/:id', to: 'sites#index'
  get 'events/:id/edit', to: 'sites#index'

  namespace :api do
    resources :events, only: %i[index show create destroy update]
  end
end
