class AddSlugToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :slug, :string
    add_column :books, :published, :string
    add_column :books, :price, :numeric
  end
end
