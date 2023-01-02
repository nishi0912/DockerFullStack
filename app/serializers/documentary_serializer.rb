class DocumentarySerializer < ActiveModel::Serializer
  attributes :id, :documentary_name, :price, :book_id, :book_name, :views, :slug, :documentary_content

  belongs_to :book
end
