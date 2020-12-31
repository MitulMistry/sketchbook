class SketchSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :description, :image_large, :image_medium, :image_original
  has_one :user #belongs_to in activerecord, but serializer uses has_one
  has_many :tags
  #has_many :comments
  has_one :image #original image

  def image_large
    # object.image.url(:large)
    variant = object.image.variant(resize_to_limit: "1024x1024")
    return rails_representation_url(variant, only_path: true)
  end

  def image_medium
    # object.image.url(:medium)
    variant = object.image.variant(resize_to_limit: "400x600")
    return rails_representation_url(variant, only_path: true)
  end

  def image_original
    return rails_blob_path(object.image, only_path: true)
  end
end
