require 'rails_helper'

RSpec.describe Tag, type: :model do
  it "has a valid factory" do
    expect(build(:tag)).to be_valid #using FactoryGirl syntax methods in rails_helper.rb
  end

  describe "associations" do
    it { should have_many(:sketches) } #using shoulda-matchers
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:name) }
      it { should validate_length_of(:name).is_at_most(40) }
      it { should validate_uniqueness_of(:name) }
    end
  end

  describe "#non_empty" do
    it "returns an array of all tags that have at least 1 associated sketch" do
      tag1 = create(:tag_with_sketch)
      tag2 = create(:tag)

      tags = Tag.non_empty
      expect(tags).to include(tag1)
      expect(tags).not_to include(tag2)
    end

    it "doesn't return duplicate tags" do
      tag1 = create(:tag_with_sketch)
      tag1.sketches << create(:sketch)

      expect(Tag.non_empty).to eq [tag1]
    end
  end
end
