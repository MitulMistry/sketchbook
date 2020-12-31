class SketchSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :description, :image_large, :image_medium, :image_original
  has_one :user #belongs_to in activerecord, but serializer uses has_one
  has_many :tags
  #has_many :comments
  has_one :image #original image

  def image_large
    variant = object.image.variant(resize_to_fit: [1024, 1024])
    return rails_representation_url(variant, only_path: true)
  end

  def image_medium
    variant = object.image.variant(resize_to_fit: [400, 600])
    return rails_representation_url(variant, only_path: true)
  end

  def image_original
    return rails_blob_path(object.image, only_path: true)
  end
end
