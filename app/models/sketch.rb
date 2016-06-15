class Sketch < ActiveRecord::Base
  belongs_to :user
  has_many :sketch_tags
  has_many :tags, through: :sketch_tags

  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 300 }
  validates :description, length: { maximum: 2000 }
end
