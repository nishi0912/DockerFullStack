class AddDeletedAtToDocumentary < ActiveRecord::Migration[6.1]
  def change
    add_column :documentaries, :deleted_at, :datetime
    add_column :documentaries, :documentary_content, :string
  end
end
