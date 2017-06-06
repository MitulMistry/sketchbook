class AddAttachmentImageToSketches < ActiveRecord::Migration[4.2]
  def self.up
    add_attachment :sketches, :image
  end

  def self.down
    remove_attachment :sketches, :image
  end
end
