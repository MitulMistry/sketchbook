require 'rails_helper'

RSpec.describe Sketch, type: :model do
  it "has a valid factory" do
    expect(build(:sketch)).to be_valid #using FactoryBot syntax methods in rails_helper.rb
  end

  describe "associations" do
    it { should belong_to(:user) } #using shoulda-matchers
    it { should have_many(:tags) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:title) }
      it { should validate_length_of(:title).is_at_most(100) }
      it { should validate_content_type_of(:image).allowing("image/png", "image/jpeg", "image/jpg") }
      it { should validate_content_type_of(:image).rejecting("text/plain", "text/xml") }
      it { should validate_size_of(:image).less_than(2.megabytes) }
    end

    context "other validations" do
      it { should validate_length_of(:description).is_at_most(2000) }
    end
  end

  # describe "image from url" do
  #   it "creates an image from a url" do
  #     sketch = build(:sketch)
  #     sketch.image = nil
  #     sketch.image_from_url(Faker::LoremPixel.image(size: "300x200"))
  #     sketch.save

  #     expect(sketch).to be_valid
  #   end
  # end

  describe "randomized" do
    it "returns a random number of sketches" do
      5.times { create(:sketch) }

      sketches = Sketch.randomized(3)
      expect(sketches.first).to be_a(Sketch)
      expect(sketches.length).to eq 3

      sketches = Sketch.randomized(5)
      expect(sketches.first).to be_a(Sketch)
      expect(sketches.length).to eq 5
    end
  end
end
