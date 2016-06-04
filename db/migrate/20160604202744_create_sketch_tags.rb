class CreateSketchTags < ActiveRecord::Migration
  def change
    create_table :sketch_tags do |t|
      t.integer :sketch_id
      t.integer :tag_id

      t.timestamps null: false
    end
  end
end
