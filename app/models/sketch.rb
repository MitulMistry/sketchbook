require 'uri' #for URI.parse in image_from_url

class Sketch < ActiveRecord::Base
  belongs_to :user
  has_many :sketch_tags
  has_many :tags, through: :sketch_tags

  has_attached_file :image, styles: { large: "1024x768>", medium: "300x300>", thumb: "100x100#" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates_attachment_file_name :image, matches: [/png\Z/, /jpe?g\Z/]

  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 300 }
  validates :description, length: { maximum: 2000 }

  def image_from_url(url)
    self.image = URI.parse(url)
  end
end
