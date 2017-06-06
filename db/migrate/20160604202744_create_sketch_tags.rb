class CreateSketchTags < ActiveRecord::Migration[4.2]
  def change
    create_table :sketch_tags do |t|
      t.integer :sketch_id
      t.integer :tag_id

      t.timestamps null: false
    end
  end
end
