class CreateSketches < ActiveRecord::Migration[4.2]
  def change
    create_table :sketches do |t|
      t.integer :user_id
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
