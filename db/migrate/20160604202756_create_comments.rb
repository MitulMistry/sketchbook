class CreateComments < ActiveRecord::Migration[4.2]
  def change
    create_table :comments do |t|
      t.string :content

      t.integer :user_id
      t.integer :sketch_id

      t.timestamps null: false
    end
  end
end
