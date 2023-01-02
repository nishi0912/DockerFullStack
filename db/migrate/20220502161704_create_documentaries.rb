class CreateDocumentaries < ActiveRecord::Migration[6.1]
  def change
    create_table :documentaries do |t|
      t.string :documentary_name
      t.string :book_name
      t.string :slug
      t.numeric :views
      t.numeric :price
      t.belongs_to :book, null: false, foreign_key: true

      t.timestamps
    end
  end
end
