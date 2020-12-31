require 'uri' #for URI.open

class Sketch < ActiveRecord::Base
  belongs_to :user
  has_many :sketch_tags
  has_many :tags, through: :sketch_tags

  has_one_attached :image
 
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 2000 }

  validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg'],    
    size: { less_than: 2.megabytes },
    dimension: { width: { min: 400, max: 2000 },
                height: { min: 400, max: 2000 } }

  extend ClassOrderable #for "randomized" method in concern

  def image_from_url(url)
    self.image.attach(io: URI.open(url), filename: 'generated-sketch.jpg')
  end
end
