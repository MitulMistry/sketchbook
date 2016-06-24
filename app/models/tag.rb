class Tag < ActiveRecord::Base
  has_many :sketch_tags
  has_many :sketches, through: :sketch_tags

  validates :name, presence: true, uniqueness: true, length: { maximum: 50 }
end
