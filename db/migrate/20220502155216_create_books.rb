class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :name
      t.string :content
      t.string :author
      t.numeric :sales

      t.timestamps
    end
  end
end
