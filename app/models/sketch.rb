require 'open-uri' #for URI.parse in image_from_url

class Sketch < ActiveRecord::Base
  belongs_to :user
  has_many :sketch_tags
  has_many :tags, through: :sketch_tags

  has_attached_file :image#, styles: { large: "1024x768>", medium: "300x300>", thumb: "100x100#" }#, :default_url => "/profile_photo_store/missing.png"
  #do_not_validate_attachment_file_type :image

  validates_attachment :image, presence: true,
    content_type: { content_type: ["image/jpeg", "image/jpg", "image/gif", "image/png"] },
    size: { in: 0..5.megabytes }

  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 2000 }

  def image_from_url(url)
    self.image = URI.parse(url) #self.image = open(URI.parse(url))
    #self.save #need to save after image is set
  end

  def self.randomized(count)
    order("RANDOM()").first(count)
  end
end
