Rails.application.config.middleware.insert_before 0, Rack::Cors do
allow do
    origins "http://localhost:3000" 
    # Change the origin, if it is for production(ex: domain.com/) or staging.
    # If you add "*" for origins, it will allow any one to call api, but if you want it to be private, provide specific origin

    resource "*",
    headers: :any,
    methods: [:get, :post, :put, :delete, :options, :head]
end
end
