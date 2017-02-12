require 'rails_helper'

RSpec.describe SketchTag, type: :model do
  describe "associations" do
    it { should belong_to(:sketch) } #using shoulda-matchers
    it { should belong_to(:tag) }
  end
end
