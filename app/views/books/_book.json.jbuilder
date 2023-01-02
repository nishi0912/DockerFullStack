json.extract! book, :id, :name, :content, :created_at, :updated_at
json.url book_url(book, format: :json)
