class Sketch < ActiveRecord::Base
  #belongs_to :user
  has_many :sketch_tags
  has_many :tags, through: :sketch_tags
end
