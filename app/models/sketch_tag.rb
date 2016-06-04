class SketchTag < ActiveRecord::Base
  belongs_to :sketch
  belongs_to :tag
end
