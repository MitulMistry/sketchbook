class AddAttachmentImageToSketches < ActiveRecord::Migration
  def self.up
    add_attachment :sketches, :image
  end

  def self.down
    remove_attachment :sketches, :image
  end
end
