class Tag < ActiveRecord::Base
  has_many :sketch_tags
  has_many :sketches, through: :sketch_tags

  validates :name, presence: true, uniqueness: true, length: { maximum: 40 }
  
  def self.non_empty
    Tag.joins(:sketch_tags).group('id') #returns only tags that have an associated sketch_tag, and groups by id to eliminate duplicate tags
  end
end
