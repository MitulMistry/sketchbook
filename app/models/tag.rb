class Tag < ActiveRecord::Base
  has_many :sketch_tags
  has_many :sketches, through: :sketch_tags

  validates :name, presence: true, length: { maximum: 300 }
end
