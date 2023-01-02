class BookSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :author, :slug, :published, :price, :sales, :created_at, :updated_at, :deleted_at

  has_many :documentaries
end
