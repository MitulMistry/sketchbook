class SketchSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  has_many :tags
  #has_many :comments
  has_one :image
end
