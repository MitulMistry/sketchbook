require 'rails_helper'

RSpec.describe Sketch, type: :model do
  it "has a valid factory" do
    expect(build(:sketch)).to be_valid
  end

  describe "associations" do
    it { should belong_to(:user) } #using shoulda-matchers
    it { should have_many(:tags) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:title) }
      it { should validate_length_of(:title).is_at_most(100) }

      it { should have_attached_file(:image) }
      it { should validate_attachment_presence(:image) }
      it { should validate_attachment_content_type(:image).
        allowing("image/jpeg", "image/jpg", "image/gif", "image/png").
        rejecting("text/plain", "text/xml") }
      it { should validate_attachment_size(:image).less_than(5.megabytes) }
    end

    context "other validations" do
      it { should validate_length_of(:description).is_at_most(2000) }
    end
  end

  describe "image from url" do
    it "creates an image from a url" do
      sketch = build(:sketch)
      sketch.image = nil
      sketch.image_from_url(Faker::LoremPixel.image("300x200"))
      sketch.save

      expect(sketch).to be_valid
    end
  end
end
