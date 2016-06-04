class Tag < ActiveRecord::Base
  has_many :sketch_tags
  has_many :sketches, through: :sketch_tags
end
