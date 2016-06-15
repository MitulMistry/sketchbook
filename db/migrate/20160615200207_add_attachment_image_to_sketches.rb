class AddAttachmentImageToSketches < ActiveRecord::Migration
  def self.up
    change_table :sketches do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :sketches, :image
  end
end
