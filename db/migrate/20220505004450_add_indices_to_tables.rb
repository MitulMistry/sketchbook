class AddIndicesToTables < ActiveRecord::Migration[6.1]
  def change
    add_index :comments, :user_id
    add_index :comments, :sketch_id
    add_index :sketch_tags, :sketch_id
    add_index :sketch_tags, :tag_id
    add_index :sketches, :user_id
    add_index :users, :username
  end
end
