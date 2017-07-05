class SketchSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image_large, :image_medium
  has_one :user #belongs_to in activerecord, but serializer uses has_one
  has_many :tags
  #has_many :comments
  has_one :image #original image

  def image_large
    object.image.url(:large)
  end

  def image_medium
    object.image.url(:medium)
  end
end
