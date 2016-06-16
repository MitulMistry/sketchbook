class SketchSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  has_one :user #belongs_to in activerecord, but serializer uses has_one
  has_many :tags
  #has_many :comments
  has_one :image
end
